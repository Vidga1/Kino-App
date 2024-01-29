import React from 'react';
import { Link } from 'react-router-dom';
import SelectedMoviesList from '../components/MovieList/SelectedMoviesList';
import '../styles/PlaylistsPage.css';

const PlaylistsPage: React.FC = () => {
  return (
    <div className="playlists-page-container playlists-page">
      <Link to="/" className="back-button">Назад</Link>
      <h1>Избранные фильмы</h1>
      <SelectedMoviesList />
    </div>
  );
};

export default PlaylistsPage;
