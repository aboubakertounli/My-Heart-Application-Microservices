const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock database for demo
let patients = [
    { id: 1, name: "Jean Dupont", email: "jean.dupont@email.com", history: "Antécédents cardiaques" },
    { id: 2, name: "Marie Curie", email: "marie.curie@email.com", history: "Asthme" }
];

app.get('/patients', (req, res) => {
    res.json(patients);
});

app.get('/patients/:id', (req, res) => {
    const patient = patients.find(p => p.id === parseInt(req.params.id));
    if (!patient) return res.status(404).send('Patient non trouvé');
    res.json(patient);
});

app.post('/patients', (req, res) => {
    const patient = {
        id: patients.length + 1,
        name: req.body.name,
        email: req.body.email,
        history: req.body.history
    };
    patients.push(patient);
    res.status(201).json(patient);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Patient Service running on port ${PORT}`);
});
