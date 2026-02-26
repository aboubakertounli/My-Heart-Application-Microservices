const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

// Mock database for demo
let appointments = [
    { id: 1, patientId: 1, doctor: "Dr. Martin", date: "2026-03-01", status: "Confirmé" }
];

app.get('/appointments', (req, res) => {
    res.json(appointments);
});

app.post('/appointments', async (req, res) => {
    const { patientId, doctor, date } = req.body;
    
    try {
        // Vérifier si le patient existe via Patient Service (Communication Synchrone)
        const patientRes = await axios.get(`http://patient-service:3001/patients/${patientId}`);
        
        const appointment = {
            id: appointments.length + 1,
            patientId,
            doctor,
            date,
            status: "Confirmé"
        };
        appointments.push(appointment);
        
        // Notification à Facturation Service (Communication Synchrone)
        await axios.post('http://billing-service:3003/bills', {
            appointmentId: appointment.id,
            patientId: patientId,
            amount: 50.0 // Montant fixe pour la démo
        });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(400).send('Erreur lors de la prise de rendez-vous: Patient inexistant ou service facturation indisponible');
    }
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Appointment Service running on port ${PORT}`);
});
