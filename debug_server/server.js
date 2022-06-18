const express = require('express');
const path = require("path");
let app = express();
let fileNameRegexp = new RegExp('/static/(.+)');

const BASE_DIR = path.join(__dirname, '..', 'public');

app.get(new RegExp('/.+'), (req, res) => {
    res.sendFile(path.join(BASE_DIR, req.url.match(new RegExp('/(.+)'))[1]));
});

app.listen(8085, () => console.log("http://localhost:8085/index.html"));