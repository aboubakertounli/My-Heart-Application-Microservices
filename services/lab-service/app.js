const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock database for demo (simulant NoSQL)
let labReports = [
    { id: 1, patientId: 1, test: "Analyse Sanguine", results: { cholestérol: "Normal", glycémie: "Élevée" }, date: "2026-02-15" }
];

app.get('/reports', (req, res) => {
    res.json(labReports);
});

app.get('/reports/patient/:id', (req, res) => {
    const patientReports = labReports.filter(r => r.patientId === parseInt(req.params.id));
    res.json(patientReports);
});

app.post('/reports', (req, res) => {
    const report = {
        id: labReports.length + 1,
        patientId: req.body.patientId,
        test: req.body.test,
        results: req.body.results,
        date: new Date().toISOString().split('T')[0]
    };
    labReports.push(report);
    res.status(201).json(report);
});

const PORT = process.env.PORT || 3004;
app.listen(PORT, () => {
    console.log(`Lab Service running on port ${PORT}`);
});
