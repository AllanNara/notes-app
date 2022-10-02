const e = require('connect-flash');
const { Note } = require('../models')

const renderNoteForm = (req, res) => {
    res.render("notes/new-note");
};

const createNewNote = async (req, res) => {
    const { title, description } = req.body;
    const errors = []

    if(title <= 0) errors.push(({ text: "Title cannot be empty."}));
    if(description <= 0) {
        errors.push(({ text: "Description cannot be empty."}));
    } else if(description.length < 5 ) errors.push(({ text: "Descrition must be at least 5 characters"}));
    if(errors.length > 0) {
        return res.render('notes/new-note', {
            errors,
            title,
            description
        })
    };
    const newNote = new Note({
        title, 
        description,
        user: req.user.id
    });
    await newNote.save();

    req.flash("success_msg", "Note Added Successfully")
    res.redirect('/notes');
};

const renderNotes = async (req, res) => {
    const allNotes = await Note.find({ user: req.user.id }).sort({ createdAt: 'desc' }).lean();
    res.render("notes/all-notes", { allNotes })
};

const renderEditForm = async (req, res) => {
    const { id } = req.params;
    
    const note = await Note.findById(id).lean();
    const { title, description, _id } = note;

    res.render('notes/edit-note', { 
        _id,
        title,
        description    
    });
};

const updateNote = async (req, res) => {
    const { title, description } = req.body;
    const { id } = req.params;
    const errors = []

    if(title <= 0) errors.push(({ text: "Title cannot be empty."}));
    if(description <= 0) {
        errors.push(({ text: "Description cannot be empty."}));
    } else if(description.length < 5 ) errors.push(({ text: "Descrition must be at least 5 characters"}));
    if(errors.length > 0) {
        return res.render(`notes/edit-note`, {
            errors,
            _id: id,
            title,
            description
        })
    } else {
        await Note.findByIdAndUpdate(id, {title, description});
        req.flash("success_msg", "Note Updated Successfully");
        res.redirect('/notes');
    }
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