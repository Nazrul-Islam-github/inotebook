const express = require('express')
const Router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const Notes = require('../model/Notes')
const { body, validationResult } = require('express-validator');

// get all notes of login user
Router.get('/', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id })
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).json("internal server error")
    }

})





// add notes route /api/notes/add 
Router.post('/add', fetchUser, [
    // valide user info 
    body('title', 'Enter a vaild Titile').isLength({ min: 5 }),
    body('desc', 'Enter a valid description').isLength({ min: 5 })
], async (req, res) => {


    try {

        // valide user info 
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // valide user info  end
        const { title, desc, tag } = req.body
        const user = req.user.id
        const notes = new Notes({ title, desc, tag, user })
        const saveNotes = await notes.save()
        res.status(200).json(saveNotes)
    } catch (error) {
        console.error(error.message)
        res.status(500).json("internal server error")
    }

});


// Route No 3: Update Notes /api/notes/update/:id
Router.put('/update/:id', fetchUser, async (req, res) => {
    try {
        const { title, desc, tag } = req.body;
        // Create New Notes Object
        const newNotes = {};
        if (title) newNotes.title = title;
        if (desc) newNotes.desc = desc;
        if (tag) newNotes.tag = tag;

        // ------------find the note to be updated
        let note = await Notes.findById({ _id: req.params.id });
        if (!note) return res.status(404).send("page not found");
        if (note.user.toString() !== req.user.id) return res.status(401).send("not allowed");
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNotes }, { new: true })
        res.json({ note })

    } catch (error) {
        console.error(error.message)
        res.status(500).json("internal server error")
    }

});


// Route No:4 delete notes /api/notes/delete/:id
Router.delete('/delete/:id', fetchUser, async (req, res) => {
    try {
        const note = await Notes.findById({ _id: req.params.id });
        if (!note) return res.status(404).send("Notes Not Found");

        // if user not own this note 
        if (note.user.toString() !== req.user.id) return res.status(401).send("not allowed");
        await Notes.findByIdAndDelete({ _id: req.params.id })
        res.status(200).json({ "success": "note has been deleted" })
    } catch (error) {
        console.error(error.message)
        res.status(500).json("internal server error")
    }
});


module.exports = Router