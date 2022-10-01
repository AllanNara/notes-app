const { Router } = require("express");
const router = Router();

const {
  renderNoteForm,
  createNewNote,
  renderNotes,
  renderEditForm,
  updateNote,
  deleteNote,
} = require("../controllers/notes.controller");

const { isAuthenticated } = require('../middlewares/auth');

// New note
router.get("/notes/add", isAuthenticated, renderNoteForm);
router.post("/notes/add", isAuthenticated, createNewNote);

// Get all notes
router.get("/notes", isAuthenticated, renderNotes);

// Edit notes
router.get("/notes/edit/:id", isAuthenticated, renderEditForm);
router.put("/notes/edit/:id", isAuthenticated, updateNote);

// Delete notes
router.delete("/notes/delete/:id", isAuthenticated, deleteNote);

module.exports = router;
