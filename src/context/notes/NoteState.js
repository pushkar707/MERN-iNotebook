import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const initialNotes = [
    {
      _id: "614c5ef0362e580d431b7d2c",
      user: "614abdd3177d88dc3c64d1cd",
      title: "Intro2",
      description: "My namsdewdew is pushkar",
      tags: "General",
      date: "2021-09-23T11:03:12.842Z",
      __v: 0,
    },
    {
      _id: "614f4a5ed0554cf569dd4cd4",
      user: "614abdd3177d88dc3c64d1cd",
      title: "Mynote1",
      description: "I am feeling lucky",
      tags: "General",
      date: "2021-09-25T16:10:54.529Z",
      __v: 0,
    },
    {
      _id: "614f4a0ed0554cf569dd4cd4",
      user: "614abdd3177d88dc3c64d1cd",
      title: "Mynote1",
      description: "I am feeling lucky",
      tags: "General",
      date: "2021-09-25T16:10:54.529Z",
      __v: 0,
    },
    {
      _id: "614f4a0eg554ch569dd4cd4",
      user: "614abdd3177d88dc3c64d1cd",
      title: "Mynote1",
      description: "I am feeling lucky",
      tags: "General",
      date: "2021-09-25T16:10:54.529Z",
      __v: 0,
    },
  ];

  const [notes, setnotes] = useState(initialNotes);

  // newNote = JSON.parse(newNote)

  //Add Notes
  const addNote = (title , description , tag) => {
    // TODO: API Call
    const note = {
      _id: "614f4a0eg554ch569dd4cd4",
      user: "614abdd3177d88dc3c64d1cd",
      title: title,
      description: description,
      tags: tag,
      date: "2021-09-25T16:10:54.529Z",
      __v: 0,
    };
    setnotes(notes.concat(note))
  };

  //Delete Note
  const deleteNote = (id) => {
    const newNotes = notes.filter((note)=>{return note._id !== id})
    setnotes(newNotes)
  };

  //Update Note
  const updateNote = () => {
    // setnotes()
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, updateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
