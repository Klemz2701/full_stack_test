import React, { useEffect, useState } from 'react';
import api from '../services/api'; 

const MoviesList = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 3;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movie/list', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setAllMovies(response.data); 
      } catch (error) {
        console.error("Erro ao buscar filmes:", error);
      }
    };
    fetchMovies();
  }, []);

  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = allMovies.slice(indexOfFirstMovie, indexOfLastMovie);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="page-container">
      <h2>Lista de Filmes</h2>
      {currentMovies.map(movie => (
        <div key={movie._id} style={{marginBottom: '20px'}}>
          <h3>{movie.title}</h3>
          <p>Duração: {movie.duration}</p>
          <p>Sinopse: {movie.synopsis}</p>
        </div>
      ))}
      <div>
        {Array.from({ length: Math.ceil(allMovies.length / moviesPerPage) }, (_, i) => (
          <button key={i + 1} onClick={() => paginate(i + 1)} style={{marginRight: '5px'}}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MoviesList;
