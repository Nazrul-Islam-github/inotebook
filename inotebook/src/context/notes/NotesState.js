import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const host = 'http://localhost:5000'
    const noteInitialState = [
        {
            "_id": "6150658f82dd833b6gf2cc85ef",
            "user": "6149c04b288bf11756634a78",
            "title": "this os titile",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:31.355Z",
            "__v": 0
        },
        {
            "_id": "615065ff9282dd833b62cc85f1",
            "user": "6149c04b288bf11756634a78",
            "title": "this os titile",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:34.133Z",
            "__v": 0
        },
        {
            "_id": "615065a282ddff833b62cc85f3",
            "user": "6149c04b288bf11756634a78",
            "title": "this is second note",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:50.764Z",
            "__v": 0
        },
        {
            "_id": "615fff065ab82dd833b62cc85f5",
            "user": "6149c04b288bf11756634a78",
            "title": "this is third note",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:59.909Z",
            "__v": 0
        },
        {
            "_id": "615065ab82dffd833b62cc85f5",
            "user": "6149c04b288bf11756634a78",
            "title": "this is third note",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:59.909Z",
            "__v": 0
        },
        {
            "_id": "615065ab82dd833b62cc85ff5",
            "user": "6149c04b288bf11756634a78",
            "title": "this is third note",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:59.909Z",
            "__v": 0
        },
        {
            "_id": "6f15065ab82dd833b62cc85f5",
            "user": "6149c04b288bf11756634a78",
            "title": "this is third note",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:59.909Z",
            "__v": 0
        },
        {
            "_id": "615065ab82fdd833b62cc85f5",
            "user": "6149c04b288bf11756634a78",
            "title": "this is third note",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:59.909Z",
            "__v": 0
        },
        {
            "_id": "615065ab82dd8f33b62cc85f5",
            "user": "6149c04b288bf11756634a78",
            "title": "this is third note",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:59.909Z",
            "__v": 0
        },
        {
            "_id": "6150f65ab82dd833b62cc85f5",
            "user": "6149c04b288bf11756634a78",
            "title": "this is third note",
            "desc": "this is a long description as well",
            "tag": "gte",
            "date": "2021-09-26T12:20:59.909Z",
            "__v": 0
        }
    ];

    const [notes, setNotes] = useState(noteInitialState);

    // add a note
    const addNote = async (title, desc, tag) => {
        // todo

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

        const json = response.json()
        console.log("submitting")

        let note = {
            "_id": "6150f65ab82dd833b62cc85f5",
            "user": "6149c04b288bf11756634a78",
            "title": title,
            "desc": desc,
            "tag": tag,
            "date": "2021-09-26T12:20:59.909Z",
            "__v": 0
        };
        setNotes(notes.concat(note))

    }
    //------------------ edit a note
    const editNote = async (id, title, desc, tag) => {


        // ----------------API Call-----------
        const url = `${host}/api/notes/update/${id}`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE0OWMwNGIyODhiZjExNzU2NjM0YTc4In0sImlhdCI6MTYzMjMyMjU0NX0.r4jJ2eAI4HITtMpbMjKN_QT11YN4eTCScBtCx9W9XKQ"
            },
            body: JSON.stringify({ title, desc, tag })
        });

        const json = response.json()
        //------------ Client Site Edit Logic//
        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.desc = desc;
                element.tag = tag
            }

        }
    }

    // delete a note

    const deleteNote = (id) => {
        console.log(id, "deleting");
        const newNote = notes.filter((note) => note._id !== id);
        setNotes(newNote)
    }

    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
};
export default NoteState;


