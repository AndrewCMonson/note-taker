const notes = require('express').Router();
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
const uuid = require('uuid');

// Reads the db.json file and returns all saved notes as JSON.
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Receives a new note to save on the request body, adds it to the db.json file, and then returns the new note to the client.
notes.post('/', (req, res) => {
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            noteId: uuid.v4().toString().substring(0, 8)
        };

        readAndAppend(newNote, './db/db.json');
        res.json(`Note added successfully 🚀`);
    } else {
        res.error('Error in adding note');
    }
});

// Deletes the note with an id equal to req.params.id.
notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.noteId !== noteId);

            writeToFile('./db/db.json', result);
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

module.exports = notes;