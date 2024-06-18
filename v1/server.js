// server.js

const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Route pour gérer les soumissions de formulaire
app.post('/api/contact', (req, res) => {
    const { name, email, phone, appointment, message } = req.body;

    // Configuration du transporteur SMTP pour Nodemailer (à remplacer par vos informations)
    let transporter = nodemailer.createTransport({
        host: 'smtp.example.com', // Serveur SMTP
        port: 587,
        secure: false, // true pour le port 465, false pour les autres ports
        auth: {
            user: 'votre_email@example.com', // Votre adresse email
            pass: 'votre_mot_de_passe' // Votre mot de passe
        },
        tls: {
            rejectUnauthorized: false // Nécessaire uniquement si votre serveur nécessite une authentification
        }
    });

    // Contenu de l'email
    let mailOptions = {
        from: email,
        to: 'votre_email@example.com', // Adresse email de destination
        subject: 'Nouveau message de contact depuis votre site web',
        text: `
            Nom: ${name}
            Email: ${email}
            Téléphone: ${phone}
            Rendez-vous: ${appointment || 'Non spécifié'}
            
            Message:
            ${message}
        `
    };

    // Envoi de l'email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).send('Erreur lors de l\'envoi de l\'email.');
        } else {
            console.log('Email envoyé: ' + info.response);
            res.status(200).send('Message envoyé avec succès.');
        }
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
