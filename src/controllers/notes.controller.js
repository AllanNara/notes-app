const renderNoteForm = (req, res) => {
    res.send("note add");
};

const createNewNote = (req, res) => {
    res.send('new note')
};

const renderNotes = (req, res) => {
    res.send('render notes')
};

const renderEditForm = (req, res) => {
    res.send('render edit form')
};

const updateNote = (req, res) => {
    res.send('update note')
};

const deleteNote = (req, res) => {
    res.send('update note')
};


module.exports = {
    renderNoteForm,
    createNewNote,
    renderNotes,
    renderEditForm,
    updateNote,
    deleteNote
}