import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SelectedMoviesList from '../components/MovieList/SelectedMoviesList';
import '../styles/PlaylistsPage.css';
import Pagination from '../components/Pagination/Pagination';

const PlaylistsPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const moviesPerPage = 20;

  useEffect(() => {
    const rawStoredMovies = localStorage.getItem('selectedMovies') || '{}';
    const storedMovies = JSON.parse(rawStoredMovies);
    const totalMovies = Object.values(storedMovies).length;
    setTotalPages(Math.ceil(totalMovies / moviesPerPage));
  }, [moviesPerPage]);

  return (
    <div className="playlists-page-container playlists-page">
      <Link to="/home" className="back-button">
        Назад
      </Link>
      <h1>Избранные фильмы</h1>
      <SelectedMoviesList
        currentPage={currentPage}
        moviesPerPage={moviesPerPage}
      />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default PlaylistsPage;
