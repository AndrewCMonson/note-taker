const express = require('express');
const path = require('path');
const api = require('./routes/index.js');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', api);

app.get('/', (req, res) => {
    console.log('GET request for homepage');
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) =>{
    console.log('GET request for notes page');
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});