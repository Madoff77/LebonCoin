const express = require('express');
const Ad = require('../models/Ad'); // Modèle pour les annonces
const router = express.Router();

// Récupérer toutes les annonces
router.get('/ads', async (req, res) => {
  try {
    const ads = await Ad.find(); // Récupération de toutes les annonces
    res.json(ads); // Retourne les annonces en JSON
  } catch (err) {
    console.error('Erreur lors de la récupération des annonces :', err);
    res.status(500).json({ error: 'Erreur lors de la récupération des annonces' });
  }
});

// Ajouter une nouvelle annonce
router.post('/ads', async (req, res) => {
  try {
    const { title, description, price, category } = req.body;

    // Validation des champs
    if (!title || !description || !price || !category) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const newAd = new Ad({ title, description, price, category });
    await newAd.save(); // Sauvegarde de l'annonce
    res.status(201).json(newAd); // Retourne l'annonce créée
  } catch (err) {
    console.error('Erreur lors de la création de l’annonce :', err);
    res.status(500).json({ error: 'Erreur lors de la création de l’annonce' });
  }
});

// Modifier une annonce
router.put('/ads/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category } = req.body;

    // Validation des champs
    if (!title || !description || !price || !category) {
      return res.status(400).json({ error: 'Tous les champs sont requis' });
    }

    const updatedAd = await Ad.findByIdAndUpdate(id, { title, description, price, category }, { new: true });
    if (!updatedAd) {
      return res.status(404).json({ error: 'Annonce non trouvée' });
    }

    res.json(updatedAd);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de l’annonce :', err);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l’annonce' });
  }
});

// Supprimer une annonce
router.delete('/ads/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAd = await Ad.findByIdAndDelete(id);
    if (!deletedAd) {
      return res.status(404).json({ error: 'Annonce non trouvée' });
    }

    res.json({ message: 'Annonce supprimée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression de l’annonce :', err);
    res.status(500).json({ error: 'Erreur lors de la suppression de l’annonce' });
  }
});

module.exports = router;
