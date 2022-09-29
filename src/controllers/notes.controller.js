const Note = require('../models/Note')

const renderNoteForm = (req, res) => {
    res.render("notes/new-note");
};

const createNewNote = async (req, res) => {
    const { title, description } = req.body;

    const newNote = new Note({title, description});
    await newNote.save()
    res.send('new note');
};

const renderNotes = async (req, res) => {
    const allNotes = await Note.find().lean();
    res.render("notes/all-notes", { allNotes })

};

const renderEditForm = (req, res) => {
    res.send('render edit form');
};

const updateNote = (req, res) => {
    res.send('update note');
};

const deleteNote = (req, res) => {
    res.send('update note');
};


module.exports = {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
}