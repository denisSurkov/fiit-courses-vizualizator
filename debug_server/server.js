const express = require('express');
const path = require("path");
const {urlencoded} = require("express");
let app = express();

const BASE_DIR = path.join(__dirname, '..', 'public');
const HOST_URL = 'http://localhost:8085'

app.get(new RegExp('/.+'), (req, res) => {
    res.sendFile(
        path.join(BASE_DIR, decodeURIComponent(new URL(HOST_URL + req.url).pathname))
    );
});

app.listen(8085, () => console.log(HOST_URL + '/index.html'));