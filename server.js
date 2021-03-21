const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/db/db.json'));
});
    
app.post('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname + '/db/db.json'), 'utf-8', (err, noteObj) => {
        let notes = JSON.parse(noteObj)
        let note = req.body
        note.id = Math.random()
        notes.push(note)

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), 'utf-8', (err) => {
            if (err) console.log(err);
            console.log("new note saved")
        })
    })
    res.send()
});

app.delete('/api/notes/:id', (req, res) => {
    fs.readFile(path.join(__dirname + '/db/db.json'), 
    'utf-8', (err, noteObj) => {
        if (err) console.log(err)
        let id = req.params.id
        let notes = JSON.parse(noteObj)
        let deleteNote = notes.findIndex(n => n.id === id)
        notes.splice(deleteNote, 1)

        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), 'utf-8', (err) => {
            if (err) console.log(err);
            console.log("note deleted")
        })
    })
    res.send()
    
});

app.listen(PORT, err => {
    if (err) {
        console.log(err);
    }
    console.log(`listening on http://localhost:${PORT}`);
});