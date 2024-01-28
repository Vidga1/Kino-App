import React from 'react';
import SelectedMoviesList from '../components/MovieList/SelectedMoviesList';

const PlaylistsPage: React.FC = () => {
  return (
    <div>
      <h1>Избранные фильмы</h1>
      <SelectedMoviesList />
    </div>
  );
};

export default PlaylistsPage;
