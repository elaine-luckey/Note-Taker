const express = require('express');
const { createNewNote, deleteNote } = require('../notes');
const router = express.Router();

// Get all notes
router.get('/notes', (request, response) => {
  response.json(notesArr);
});

// Create a new note
router.post('/notes', (request, response) => {
  try {
    const newNote = { ...request.body, id: notesArr.length.toString() };
    const createdNote = createNewNote(newNote, notesArr);
    response.json(createdNote);
  } catch (error) {
    response.status(500).json({ error: 'Sorry, unable to create a note.' });
  }
});

// Delete a note by ID
router.delete('/notes/:id', async (request, response) => {
  const { id } = request.params;
  try {
    notesArr = await deleteNote(id, notesArr);
    response.json(notesArr);
  } catch (error) {
    response.status(500).json({ error: 'Sorry, unable to delete the note.' });
  }
});

module.exports = router;
