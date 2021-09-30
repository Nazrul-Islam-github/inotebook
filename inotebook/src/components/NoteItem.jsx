import React from 'react'
import { useContext } from "react";
import NotesContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(NotesContext);
  const {deleteNote } = context;
    const {note}= props;
 
    return (
   
      <div className="col-md-3"> 
     <div className="card my-3">
        
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.desc}</p>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id)}}></i>
          <i className="far fa-edit mx-2"></i>
          
        </div>
      </div>
      </div>
    )
}

export default NoteItem
