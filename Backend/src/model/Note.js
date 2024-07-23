const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
    title: String,
    message: String
});

module.exports = mongoose.model("Note", NoteSchema);