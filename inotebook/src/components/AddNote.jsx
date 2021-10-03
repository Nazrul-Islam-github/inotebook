import React, { useState } from "react";
import { useContext } from "react";
import NotesContext from "../context/notes/noteContext";
import Notes from "./Notes";
const AddNote = () => {
  const context = useContext(NotesContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag: "default" });
  const handleSubmit = (event) => {
    event.preventDefault();
    addNote(note.title,note.desc,note.tag)
    setNote({ title: "", desc: "", tag: "default" })
  };

  const onChange = (event) => {

    setNote({...note,[event.target.name]:event.target.value});

  };

  return (
    <div className="container">
      <h2>Add Notes</h2>
      <form>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="title"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputPassword1"
            name="desc"
            onChange={onChange}
            value={note.desc}
          />
        </div>
      
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
          disabled={note.title<5|| note.desc<5}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
