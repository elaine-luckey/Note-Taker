const fs = require('fs');
const path = require('path');

//Create a new note function using a try...catch
function createNewNote(body, notesArray) {
  try {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
      path.join(__dirname, './db/db.json'),
      JSON.stringify({ notesArray }, null, 2)
    );
    return note;
  } catch (error) {
    throw error; // Rethrow the error to be handled by the calling code or error handling middleware.
  }
}

// delete note with matching index
function deleteNote(id, notes) {
    try {
      let notesArray = notes.filter(el => {
        return el.id != id;
      });
  
      // re-index 
      notesArray.forEach((note, index) => {
        note.id = index;
      });
  
      // write to file
      fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify({ notesArray }, null, 2)
      );
      return notesArray;
    } catch (error) {
      throw error; // Rethrow the error to be handled by the calling code or error handling middleware.
    }
  }

//export modules for createNewNote and deleteNote
module.exports = {
  createNewNote,
  deleteNote
};
