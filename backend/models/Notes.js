const mongoose = require('mongoose')
const { Schema } = mongoose;

const notesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    tags:{
        type: String,
        default: 'General'
    },
    date:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notes' , notesSchema)


