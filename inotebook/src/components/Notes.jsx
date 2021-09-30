import React from "react";
import { useContext } from "react";
import NotesContext from "../context/notes/noteContext";
import NoteItem from './NoteItem'
import AddNote from "./AddNote";
const Notes = () => {
  const context = useContext(NotesContext);
  const { notes, setNotes,addNotes } = context;
  return (<>
    <AddNote/>
    <div className="row my-3">
      <h2>Yours Notes</h2>
      {notes.map((note) => {
        return <NoteItem note={note} key={note._id}/>
      })}
    </div>
    </>
  );
};

export default Notes;
