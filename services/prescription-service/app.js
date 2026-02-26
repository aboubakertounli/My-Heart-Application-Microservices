const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock database for demo
let prescriptions = [
    { id: 1, patientId: 1, doctor: "Dr. Martin", medication: "Amoxicilline", dosage: "500mg x 3/jour", duration: "7 jours" }
];

app.get('/prescriptions', (req, res) => {
    res.json(prescriptions);
});

app.get('/prescriptions/patient/:id', (req, res) => {
    const patientPrescriptions = prescriptions.filter(p => p.patientId === parseInt(req.params.id));
    res.json(patientPrescriptions);
});

app.post('/prescriptions', (req, res) => {
    const prescription = {
        id: prescriptions.length + 1,
        patientId: req.body.patientId,
        doctor: req.body.doctor,
        medication: req.body.medication,
        dosage: req.body.dosage,
        duration: req.body.duration
    };
    prescriptions.push(prescription);
    res.status(201).json(prescription);
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Prescription Service running on port ${PORT}`);
});
