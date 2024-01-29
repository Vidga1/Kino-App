import React from 'react';
import SelectedMoviesList from '../components/MovieList/SelectedMoviesList';
import '../styles/PlaylistsPage.css';

const PlaylistsPage: React.FC = () => {
  return (
    <div className="playlists-page-container">
      <h1>Избранные фильмы</h1>
      <SelectedMoviesList />
    </div>
  );
};

export default PlaylistsPage;
