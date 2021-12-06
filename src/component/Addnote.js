import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";

const Addnote = () => {
  const context = useContext(noteContext);
  const {addNote } = context;

  const [note, setnote] = useState({title: "" , description: "" , tag: "default"})

  const handleSubmit = (e)=>{
    e.preventDefault();
    addNote(note.title , note.description , note.tag)
    // addNote(note)
  }

  const onChange = (e)=>{
    setnote({...note , [e.target.name]: [e.target.value]})
  }
  
  return (
    <div>
      <h3>Add Note</h3>
      <form>
      {/* title */}
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title" name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
          />          
        </div>
        {/* Description */}
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description" name="description"
            onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
          Add Note
        </button>
      </form>
    </div>
  );
};

export default Addnote;
