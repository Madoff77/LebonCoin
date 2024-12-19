# Projet "Le Bon Coin" (MERN Stack)
Description
Une application web inspirée de Le Bon Coin, développée avec la stack MERN (MongoDB, Express, React, Node.js). Cette application permet aux utilisateurs de s'inscrire, de se connecter, et de gérer des annonces (ajout, modification, suppression, consultation).

Fonctionnalités
Authentification
Inscription d'un utilisateur avec validation (nom d'utilisateur, email, mot de passe).
Connexion avec génération d'un token JWT.
Sécurisation des routes nécessitant une authentification.
Gestion des Annonces
CRUD Complet :
Ajouter une annonce avec titre, description, catégorie et prix.
Modifier une annonce existante.
Supprimer une annonce.
Consulter toutes les annonces disponibles.
Affichage des annonces sous forme de cartes.

Technologies Utilisées
Frontend
React.js (React Router pour la navigation, Axios pour les appels API).
CSS (ou Bootstrap/Material-UI pour le style).
Backend
Node.js et Express.js (gestion des routes, logique métier).
JWT (sécurisation des routes).
Bcrypt (hachage des mots de passe).
Base de Données
MongoDB (via MongoDB Compass pour la gestion locale).
Installation et Lancement
Prérequis
Node.js (v14 ou supérieur)
NPM ou Yarn
MongoDB installé localement ou MongoDB Atlas
1. Cloner le Projet

git clone https://github.com/votre-utilisateur/votre-projet.git

2. Installation des Dépendances
Backend

cd backend
npm install

Frontend

cd frontend
npm install

3. Configuration
Backend
Créez un fichier .env dans le dossier backend avec les variables suivantes :

makefile

MONGO_URI=mongodb://localhost:27017/leboncoin
JWT_SECRET="1234"
PORT=5000
Frontend
Assurez-vous que le fichier api.js pointe vers le bon port :

javascript

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});
4. Lancer le Projet
Lancer le Backend
Dans le dossier backend :


npm run dev

Lancer le Frontend
Dans le dossier frontend :

Copier le code
npm start

Utilisation
Accédez à l'application sur http://localhost:3000.

Inscrivez-vous pour créer un compte.

Connectez-vous pour accéder aux fonctionnalités (ajout, modification, suppression des annonces).

Gérez vos annonces via une interface simple et intuitive.

Structure du Projet

projet-leboncoin/
├── backend/
│   ├── models/       # Modèles Mongoose (User, Ad)
│   ├── routes/       # Routes (authRoutes, adRoutes)
│   ├── server.js     # Point d'entrée du backend
│   └── .env          # Variables d'environnement
├── frontend/
│   ├── src/
│   │   ├── pages/    # Pages (Login, Register, Ads, AdDetails)
│   │   ├── api.js    # Configuration Axios
│   │   ├── App.js    # Routes principales
│   │   └── index.js  # Point d'entrée du frontend
├── README.md         # Documentation du projet
