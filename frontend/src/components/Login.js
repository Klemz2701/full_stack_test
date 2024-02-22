import React, { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/user/login', { email, password });
      localStorage.setItem('token', data.token);
      navigate('/menu');
    } catch (error) {
      alert('Falha no login: Usuário ou senha incorretos ou inexistentes');
    }
  };

  return (
    <div className="form-login">
      <form onSubmit={handleSubmit}>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Senha" />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
