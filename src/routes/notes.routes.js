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
const { isOwnership } = require("../middlewares/owner");

// Middleware
router.use('/', isAuthenticated)

// New note
router.get("/add", renderNoteForm);
router.post("/add", createNewNote);

// Get all notes
router.get("/", renderNotes);

// Edit notes
router.get("/edit/:id", isOwnership ,renderEditForm);
router.put("/edit/:id", isOwnership ,updateNote);

// Delete notes
router.delete("/delete/:id", isOwnership, deleteNote);

module.exports = router;
