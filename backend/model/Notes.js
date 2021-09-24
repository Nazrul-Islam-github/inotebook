const mongoose = require("mongoose")

const { model, Schema } = mongoose
const NoteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        required: true
    },

    desc: {
        type: String,
        required: true
    },

    tag: {
        type: String,
        default: "general",
        required: false
    },

    date: {
        type: Date,
        default: Date.now,
    }
});

const Notes = model("Note", NoteSchema)
module.exports = Notes