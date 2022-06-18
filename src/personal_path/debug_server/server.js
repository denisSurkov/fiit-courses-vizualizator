const express = require('express');
const path = require("path");
let app = express();
let fileNameRegexp = new RegExp('/static/(.+)');

app.get(new RegExp("/static/.+"), (req, res) => {
    //res.sendFile('./static/' + req.)
    res.sendFile(path.join(__dirname, '\\static\\',  req.url.match(fileNameRegexp)[1]));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'own_path.html'));
});

app.get(new RegExp('/.+'), (req, res) => {
    res.sendFile(path.join(__dirname, '..', req.url.match(new RegExp('/(.+)'))[1]));
});

app.listen(8085, () => console.log("http://localhost:8085/"));