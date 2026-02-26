const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Mock database for demo
let bills = [
    { id: 1, appointmentId: 1, patientId: 1, amount: 50.0, status: "Payé" }
];

app.get('/bills', (req, res) => {
    res.json(bills);
});

app.post('/bills', (req, res) => {
    const { appointmentId, patientId, amount } = req.body;
    const bill = {
        id: bills.length + 1,
        appointmentId,
        patientId,
        amount,
        status: "En attente"
    };
    bills.push(bill);
    res.status(201).json(bill);
});

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
    console.log(`Billing Service running on port ${PORT}`);
});
