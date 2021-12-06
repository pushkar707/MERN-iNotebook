import React, {useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem'

const Notes = () => {
    const context = useContext(noteContext)
    const {notes} = context
    return (
        <div className="row my-4">
            <h2 className="fw-bold text-center">Your Notes</h2>         
            {notes.map((note)=>{
                return <Noteitem key={note._id} note = {note}/>
            })}
        </div>
    )
}

export default Notes
