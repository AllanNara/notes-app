const Note = require('../models/Note')

const renderNoteForm = (req, res) => {
    res.render("notes/new-note");
};

const createNewNote = async (req, res) => {
    const { title, description } = req.body;

    const newNote = new Note({title, description});
    await newNote.save();
    req.flash("success_msg", "Note Added Successfully")
    res.redirect('/notes');
};

const renderNotes = async (req, res) => {
    const allNotes = await Note.find().lean();
    res.render("notes/all-notes", { allNotes })
};

const renderEditForm = async (req, res) => {
    const { id } = req.params;
    
    const note = await Note.findById(id).lean();
    res.render('notes/edit-note', { note });
};

const updateNote = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;

    await Note.findByIdAndUpdate(id, {title, description});
    req.flash("success_msg", "Note Updated Successfully");
    res.redirect('/notes');
};

const deleteNote = async (req, res) => {
    const { id } = req.params;

    await Note.findByIdAndDelete(id);
    req.flash("success_msg", "Note Deleted Successfully");
    res.redirect('/notes');
};


module.exports = {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
}