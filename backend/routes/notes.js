const express = require('express')
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const router = express.Router()

//1st ROUTE: A Get Request to Fetch All Notes
router.get('/fetchallnotes', fetchUser , async (req,res)=> {
    const notes = await Notes.find({user: req.user.id});
    res.json(notes)
})

//2nd ROUTE: A Post Request To Add Notes
router.post('/addnotes', fetchUser,  [
    body('title' , 'Title Field cannot be empty.').exists(),
    body('description' , 'Description Field cannot be empty.').exists()
    ] , async (req,res)=> {
        try {
            //Returning Error in Case Validation is Not Fulfilled
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
            }

            //Checking if the title Entered is Unique

            // let user = await Notes.findOne({title: req.body.title})
            // if(user){
            //     return res.status(400).send('You Have Alreadty Made a Note With That Title.')
            // }

            //Entering Values to Database if vaildation is done.
            const {title , description , tag} = req.body
            const note = await Notes.create({title , description , tag , user:req.user.id})

            //Sending Output
            res.json(note)
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Something Went Wrong')
        }
})

//3rD ROUTE: Updating an Existing Note
router.put('/updatenote/:id', fetchUser , async (req,res)=> {
    //Checking which values have been updated by the user
    const {title , description , tag} = req.body
    const newNote = {}
    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    //Checking If The id in URL Exists
    let note = await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send('Not Found')
    }

    //Checking That the note which user wants to update belongs to that user
    if(note.user.toString() !== req.user.id){
        return res.status(401).send('Access Denied')
    }

    //Updating The Note
    note = await Notes.findByIdAndUpdate(req.params.id , {$set: newNote} , {new:true})
    res.json({note});//Sending Updated Note in Output.
})

//4TH ROUTE: Deleting an existing Note
router.delete('/deletenote/:id', fetchUser , async (req,res)=> {
    //Checking If The id in URL Exists
    let note = await Notes.findById(req.params.id)
    if(!note){
        return res.status(404).send('Not Found')
    }

    //Checking That the note which user wants to update belongs to that user
    if(note.user.toString() !== req.user.id){
        return res.status(401).send('Access Denied')
    }

    //Deleting the note
    note = await Notes.findByIdAndDelete(req.params.id)
    res.send('Note Deleted');//Sending Updated Note in Output.
})


module.exports = router