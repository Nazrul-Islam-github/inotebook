import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const noteInitialState = []

    const [notes, setNotes] = useState(noteInitialState);




    // ---------------------Get All Notes---------------
    const getAllNotes = async () => {
        const url = `${host}/api/notes/`
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0OWMwNGIyODhiZjExNzU2NjM0YTc4In0sImlhdCI6MTYzMjMyMjU0NX0.r4jJ2eAI4HITtMpbMjKN_QT11YN4eTCScBtCx9W9XKQ"
            },

        });


        const json = await response.json()
        console.log(json)
        setNotes(json)




    }
    // ---------------------Get All Notes End---------------






    //---------------------- add a note------------------
    const addNote = async (title, desc, tag) => {
        // ----------------API Call-----------
        const url = `${host}/api/notes/add`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0OWMwNGIyODhiZjExNzU2NjM0YTc4In0sImlhdCI6MTYzMjMyMjU0NX0.r4jJ2eAI4HITtMpbMjKN_QT11YN4eTCScBtCx9W9XKQ"
            },
            body: JSON.stringify({ title, desc, tag })
        });


        const json = await response.json()
        console.log(json)
        console.log("submitting")

        let note = json;
        setNotes(notes.concat(note))

    }


    //------------------ edit a note---------------
    const editNote = async (id, title, desc, tag) => {


        // ----------------API Call-----------
        const url = `${host}/api/notes/update/${id}`
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0OWMwNGIyODhiZjExNzU2NjM0YTc4In0sImlhdCI6MTYzMjMyMjU0NX0.r4jJ2eAI4HITtMpbMjKN_QT11YN4eTCScBtCx9W9XKQ"
            },
            body: JSON.stringify({ title, desc, tag })
        });

        const json = await response.json()
        console.log(json)
        let UpdatedNote = JSON.parse(JSON.stringify(notes))


        //------------ Client Site Edit Logic//
        for (let index = 0; index < UpdatedNote.length; index++) {
            const element = UpdatedNote[index];
            if (element._id === id) {
                UpdatedNote[index].title = title;
                UpdatedNote[index].desc = desc;
                UpdatedNote[index].tag = tag
                break;
            }
        }
        setNotes(UpdatedNote)
    }

    // delete a note

    const deleteNote = async (id) => {


        // --delete notes api call-------------
        const url = `${host}/api/notes/delete/${id}`
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0OWMwNGIyODhiZjExNzU2NjM0YTc4In0sImlhdCI6MTYzMjMyMjU0NX0.r4jJ2eAI4HITtMpbMjKN_QT11YN4eTCScBtCx9W9XKQ"
            },

        });

        const json = await response.json()
        console.log(json)
        console.log(id, "deleting");
        const newNote = notes.filter((note) => note._id !== id);
        setNotes(newNote)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote, getAllNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
};
export default NoteState;


