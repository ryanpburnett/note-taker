const fs = require('fs')
const path = require('path')
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/notes.html'))
})

app.post('/api/notes', (req, res) => {
    
})

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`)
})