import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h1>Menu Principal</h1>
      <button onClick={() => navigate('/movies')} style={buttonStyle}>Lista de Filmes</button>
      <button onClick={() => navigate('/users')} style={buttonStyle}>Lista de Usuários</button>
    </div>
  );
};

const buttonStyle = {
  background: '#007bff',
  color: '#ffffff',
  border: 'none',
  padding: '20px 20px',
  margin: '10px 10px',
  borderRadius: '5px',
  cursor: 'pointer',

};

export default MenuPage;
