const express = require('express');
const path = require("path");
let app = express();
let fileNameRegexp = new RegExp('/static/(.+)');

app.get(new RegExp("/static/.+"), (req, res) => {
    //res.sendFile('./static/' + req.)
    res.sendFile(path.join(__dirname, '\\static\\',  req.url.match(fileNameRegexp)[1]));
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

app.get(new RegExp('/.+'), (req, res) => {
    res.sendFile(path.join(__dirname, '..', req.url.match(new RegExp('/(.+)'))[1]));
});

app.listen(8085, () => console.log("http://localhost:8085/?s1=c1&s2=c2&s3=c3"));