const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const authRoutes = require('./Routes/authRoutes'); // Import des routes d'authentification
const adRoutes = require('./Routes/adRoutes'); // Import des routes annonces

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connecté'))
  .catch((err) => console.error('Erreur de connexion à MongoDB', err));

// Routes
app.use('/api/auth', authRoutes); // Routes d'authentification
app.use('/api', adRoutes); // Routes des annonces

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
