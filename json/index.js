const express = require("express");
var bodyParser = require('body-parser');
const app = express();
const importData = require("./data.json");
let port = process.env.PORT || 3000;

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.status(201).json(importData);
});

app.post("/", (req, res) => {
    importData.livros.push({
        titulo: req.body.titulo,
        autor: req.body.autor,
        ano: req.body.ano,
        status: req.body.status,
        portador: req.body.portador
    });
    res.status(201).json(importData);
});

app.listen(port, () => {
    console.log(`example app is listening on port http://localhost:${port}`);
});