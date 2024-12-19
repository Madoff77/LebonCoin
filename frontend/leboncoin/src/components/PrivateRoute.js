import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Vérifie si le token JWT est présent
  return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
