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
        id: req.body.id,
        titulo: req.body.titulo,
        autor: req.body.autor,
        ano: req.body.ano,
        status: req.body.status,
        portador: req.body.portador
    });
    res.status(201).json(importData);
});

app.put('/', (req, res) => {
    var id = req.body.id;
    var index = importData.livros.findIndex(data => data.id == id);
    if (index == -1) {
        res.status(404).json({
            message: 'Livro não encontrado.',
            success: false
        });
    } else {
        const newBook = {
            id: req.body.id,
            titulo: req.body.titulo,
            autor: req.body.autor,
            ano: req.body.ano,
            status: req.body.status,
            portador: req.body.portador
        }

        importData.livros.splice(index, 1, newBook);

        res.status(200).json({
            message: 'Livro registrado com sucesso.',
            success: true
        });
    }
});

app.listen(port, () => {
    console.log(`example app is listening on port http://localhost:${port}`);
});