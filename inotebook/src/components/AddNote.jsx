import React, { useState } from "react";
import { useContext } from "react";
import NotesContext from "../context/notes/noteContext";
const AddNote = () => {
  const context = useContext(NotesContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", desc: "", tag: "default" });
  const handleSubmit = (event) => {
    event.preventDefault();
    addNote(note.title,note.desc,note.tag)
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
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
