import React, { useState, useEffect } from 'react';
import API from '../services/api';

const AdsPage = () => {
  const [ads, setAds] = useState([]);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '' });
  const [editingAd, setEditingAd] = useState(null); // Stocke l'annonce en cours d'édition

  // Fonction pour récupérer les annonces
  const fetchAds = async () => {
    try {
      const res = await API.get('/ads'); // Appel API pour récupérer les annonces
      setAds(res.data);
    } catch (err) {
      console.error('Erreur lors du chargement des annonces');
    }
  };

  // Fonction pour ajouter une annonce
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await API.post('/ads', formData); // Appel API pour créer une annonce
      alert('Annonce ajoutée avec succès');
      fetchAds(); // Recharge les annonces
      setFormData({ title: '', description: '', price: '', category: '' }); // Réinitialise le formulaire
    } catch (err) {
      console.error('Erreur lors de l’ajout de l’annonce');
      alert('Une erreur est survenue lors de l’ajout');
    }
  };

  // Fonction pour supprimer une annonce
  const handleDelete = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cette annonce ?')) {
      try {
        console.log('Suppression de l’ID:', id); // Log pour vérifier l'ID
        await API.delete(`/ads/${id}`); // Appel API pour supprimer
        alert('Annonce supprimée avec succès');
        fetchAds(); // Recharge les annonces
      } catch (err) {
        console.error('Erreur lors de la suppression de l’annonce:', err); // Log de l'erreur
        alert('Une erreur est survenue lors de la suppression');
      }
    }
  };
  

  // Fonction pour passer en mode édition
  const handleEdit = (ad) => {
    setEditingAd(ad); // Stocke l'annonce à modifier
    setFormData(ad); // Pré-remplit le formulaire avec les données de l'annonce
  };

  // Fonction pour mettre à jour une annonce
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/ads/${editingAd._id}`, formData); // Appel API pour mettre à jour l'annonce
      alert('Annonce mise à jour avec succès');
      setEditingAd(null); // Quitte le mode édition
      fetchAds(); // Recharge les annonces après mise à jour
    } catch (err) {
      console.error('Erreur lors de la mise à jour de l’annonce');
      alert('Une erreur est survenue lors de la mise à jour');
    }
  };

  // Fonction pour gérer les changements dans le formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Charger les annonces lors du montage du composant
  useEffect(() => {
    fetchAds();
  }, []);

  return (
    <div className="container">
      <h1 className="text-center my-4">Gestion des Annonces</h1>

      {/* Formulaire d'ajout ou de modification */}
      <div className="card mb-4">
        <div className="card-body">
          <h3>{editingAd ? 'Modifier une Annonce' : 'Créer une Nouvelle Annonce'}</h3>
          <form onSubmit={editingAd ? handleUpdate : handleAdd}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Titre</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control"
                required
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="price" className="form-label">Prix (€)</label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="category" className="form-label">Catégorie</label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">
              {editingAd ? 'Mettre à jour' : 'Ajouter'}
            </button>
            {editingAd && (
              <button
                type="button"
                className="btn btn-secondary ms-2"
                onClick={() => {
                  setEditingAd(null);
                  setFormData({ title: '', description: '', price: '', category: '' });
                }}
              >
                Annuler
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Liste des annonces */}
      <h2>Liste des Annonces</h2>
      <div className="row">
        {ads.map((ad) => (
          <div className="col-md-4 mb-3" key={ad._id}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{ad.title}</h5>
                <p className="card-text">{ad.description}</p>
                <p><strong>Prix :</strong> {ad.price} €</p>
                <p><strong>Catégorie :</strong> {ad.category}</p>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(ad)}
                >
                  Modifier
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(ad._id)}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdsPage;
