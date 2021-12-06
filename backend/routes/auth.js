const express = require('express')
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const router = express.Router()
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser')

const jwtKey = 'This is a secret key'

//1st ROUTE: Creating a user using Post Request. No Login Required(/api/auth/createuser)
router.post('/createuser', [
    body('name' , 'Name Field cannot be empty.').exists(),
    body('email' , 'Please Enter a Valid Email.').isEmail(),
    body('password' , 'Password Must Contain Atleast 4 characters').isLength({ min: 4 }),
    ] , async (req,res)=> {

        try {
            //Returning Errors in Case Validation is Not Fulfilled
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }

            //Checking if the Email Entered is Unique
            let user = await User.findOne({email: req.body.email})
            if(user){
                return res.status(400).send('The Email You Entered is Already Used.')
            }

            //Encrypting the password before saving it to database
            const salt = await bcrypt.genSalt(10)
            const secPass = await bcrypt.hash(req.body.password,salt)
            
            //Entering Values to Database if vaildation is done.
            user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email
            })

            // Sending Output to the user using JWT
            const data = {
                user:{
                    id: user.id
                }
            }
            const token = JWT.sign(data , jwtKey)
            res.json(token)

        } catch (error) {
            console.error(error.message);
            res.status(500).send('Something Went Wrong')
        }        
})


//2nd ROUTE : Allowing User to Login 
router.post('/login', [
    body('email' , 'Please Enter a Valid Email.').isEmail(),
    body('password' , 'Password field cannot be empty').exists(),
    ] , async (req,res)=> {

        try {

            //Returning Errors in Case Validation is Not Fulfilled
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }

            const {email , password} = req.body
            //Checking if the Email Entered is Correct
            let user = await User.findOne({email})
            if(!user){
                return res.status(400).send('Enter Valid Login Details.')
            }

            // Matching the password
            const passwordCompare = await bcrypt.compare(password , user.password)
            const data = {
                user: {
                  id: user.id
                }
              }
            const token = JWT.sign(data, jwtKey);
            if (passwordCompare) {
                return res.json({token})
            } else {
                return res.status(400).send('Enter Valid Login Details.')
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Something Went Wrong')
        }
})

//3rd ROUTE : Giving data to a logged in user

router.post('/getuser', fetchUser , async (req,res)=> {

        try {
            const userId = req.user.id
            const user = await User.findOne({id: userId}).select("-password")
            res.send(user)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Something Went Wrong')
        }

})

module.exports = router