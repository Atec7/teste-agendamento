const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

let appointments = [];

app.get('/appointments', (req, res) => {
    res.json(appointments);
});

app.post('/appointments', (req, res) => {
    const appointment = req.body;
    appointments.push(appointment);
    res.status(201).json(appointment);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
