const Note = require('../models/Note')

const isOwnership = async (req, res, next) => {
    const { id } = req.params;
    
    const note = await Note.findById(id);
    if(note.user !== req.user.id) {
        req.flash('error', 'Note not exist.');
        return res.redirect('/notes')
    };
    next()
};

module.exports = {
    isOwnership,
};