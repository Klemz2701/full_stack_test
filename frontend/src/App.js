import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import MoviesList from './components/MoviesList';
import UsersList from './components/UsersList';
import MenuPage from './components/MenuPage';
import PrivateRoute from './components/PrivateRoute'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/menu" element={<PrivateRoute><MenuPage /></PrivateRoute>} />
        <Route path="/movies" element={<PrivateRoute><MoviesList /></PrivateRoute>} />
        <Route path="/users" element={<PrivateRoute><UsersList /></PrivateRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
