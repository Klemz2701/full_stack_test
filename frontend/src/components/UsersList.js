import React, { useEffect, useState } from 'react';
import api from '../services/api';

const UsersList = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 3;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAllUsers(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };
    fetchUsers();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = allUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="page-container">
      <h2>Lista de Usuários</h2>
      {currentUsers.map(user => (
        <div key={user._id} style={{marginBottom: '20px'}}>
          <h3>Nome: {user.name}</h3>
          <p>Email: {user.email}</p>
        </div>
      ))}
      <div>
        {Array.from({ length: Math.ceil(allUsers.length / usersPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} style={{marginRight: '5px'}}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
