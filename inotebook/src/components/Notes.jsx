import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import NotesContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  // border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Notes = () => {
  const context = useContext(NotesContext);
  const { notes, getAllNotes,editNote } = context;
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState({ id:"",title: "", desc: "", tag: "default" });

  // ------------Get All Notes-----------
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, []);
  // ------------Get All Notes End----------

  const updateNotes = (currentNote) => {
    setOpen(true);
    // this set Note function for when user click edit button then set this note property to show on edit form by using note.title note.desc etc
    setNote({id:currentNote._id, title:currentNote.title, desc:currentNote.desc, tag:currentNote.tag})
  
  };

  const modalClose = () => setOpen(false);
  const onChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  const handleClick = (event) => {
    event.preventDefault();
    console.log(note,"updating a  note");
    editNote(note.id,note.title,note.desc,note.tag)
    setOpen(false)
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h3>Edit Note</h3>

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
              <div className="mb-3">
                <label className="form-label">Tag</label>
                <input
                  type="text"
                  className="form-control"
                  name="tag"
                  onChange={onChange}
                  value={note.tag}
                />
              </div>

              <Button
                variant="contained"
                color="secondary"
                className="mx-2"
                onClick={modalClose}
              >
                Close
              </Button>
              <Button
                variant="contained"
                color="primary"
                className="mx-2"
                onClick={handleClick}
                disabled={note.title<5|| note.desc<5}
              >
                Update Note
              </Button>
            </form>
          </Box>
        </Modal>
      </div>

      <AddNote />

      <div className="row my-3">
        <h2>Yours Notes</h2>
        {notes.map((note) => {
          return (
            <NoteItem note={note} updatenotes={updateNotes} key={note._id} />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
