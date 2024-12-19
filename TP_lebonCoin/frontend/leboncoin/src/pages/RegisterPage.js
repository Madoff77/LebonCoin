import React, { useState } from 'react';
import API from '../services/api'; // Importer le service API pour les appels HTTP

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Gestion des changements dans les champs du formulaire
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', formData); // Appel API pour inscrire l'utilisateur
      setMessage(res.data.message); // Message de succès depuis le backend
      setError(null); // Réinitialise les erreurs
      setFormData({ username: '', email: '', password: '' }); // Réinitialise le formulaire
    } catch (err) {
      setMessage(null);
      setError(err.response?.data?.error || 'Une erreur est survenue'); // Message d'erreur depuis le backend
    }
  };

  return (
    <div className="card mx-auto" style={{ maxWidth: '500px' }}>
      <div className="card-body">
        <h2 className="card-title text-center">Inscription</h2>
        {message && <div className="alert alert-success">{message}</div>}
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Nom d'utilisateur"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
