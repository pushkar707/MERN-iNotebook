import React , {useContext} from "react";
import noteContext from "../context/notes/noteContext";

const Noteitem = (props) => {
  const context = useContext(noteContext);
  const {deleteNote } = context;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card mx-2 my-3">
        <div className="card-body">
        <div className="d-flex justify-content-between">
            <h5 className="card-title h3">{note.title}</h5>
            <div style={{marginTop:"6px"}}>
              <i className="fas fa-trash-alt mx-1" style={{cursor:'pointer'}} onClick={()=>{deleteNote(note._id)}}></i>
              <i className="fas fa-edit mx-1" style={{cursor:'pointer'}}></i>
            </div>
        </div>          
          <p className="card-text my-2">{note.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
