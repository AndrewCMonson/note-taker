const notes = require('express').Router();
const { writeToFile } = require('../helpers/fsUtils');
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');
const uuid = require('uuid');

notes.get('/', (req, res) => {
    // console.log('GET request for notes page');
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log('POST request for notes page');

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

notes.delete('/:id', (req, res) => {
    console.log('DELETE request for notes page');
    const noteId = req.params.id;

    readFromFile('./db/db.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.noteId !== noteId);
            console.log(result);

            writeToFile('./db/db.json', result);
            res.json(`Item ${noteId} has been deleted 🗑️`);
        });
});

module.exports = notes;