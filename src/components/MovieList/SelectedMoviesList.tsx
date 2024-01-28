import React, { useState, useEffect } from 'react';

const SelectedMoviesList: React.FC = () => {
  const [selectedMovies, setSelectedMovies] = useState<MovieSelect[]>([]);

  useEffect(() => {
    const rawStoredMovies = localStorage.getItem('selectedMovies') || '{}';
    const storedMovies: { [key: string]: MovieSelect } =
      JSON.parse(rawStoredMovies);
    const validMovies = Object.values(storedMovies).filter(
      (movie) => movie.nameRu && movie.posterUrlPreview,
    );
    setSelectedMovies(validMovies);
  }, []);

  const handleMovieRemove = (movieId: number | undefined) => {
    if (movieId === undefined) return; // Если movieId не определен, функция ничего не делает

    setSelectedMovies((prevMovies) => {
      const newMovies = prevMovies.filter(
        (m) => m.kinopoiskId !== movieId && m.filmId !== movieId,
      );
      const newStoredMovies = {
        ...JSON.parse(localStorage.getItem('selectedMovies') || '{}'),
      };
      delete newStoredMovies[movieId];
      localStorage.setItem('selectedMovies', JSON.stringify(newStoredMovies));
      return newMovies;
    });
  };

  return (
    <div className="movies">
      {selectedMovies.map((movie) => (
        <div key={movie.kinopoiskId || movie.filmId} className="movie">
          <div className="movie__cover-inner">
            <img
              src={movie.posterUrlPreview}
              className="movie__cover"
              alt={movie.nameRu}
            />
            <button
              className="movie__select-button"
              onClick={() =>
                handleMovieRemove(movie.kinopoiskId ?? movie.filmId)
              }
            >
              ✕
            </button>
          </div>
          <div className="movie__info">
            <div className="movie__title">{movie.nameRu}</div>
            <div className="movie__details">
              {movie.countries?.map((c) => c.country).join(', ') ||
                'Неизвестно'}{' '}
              - {movie.year}
            </div>
            <div className="movie__category">
              {movie.genres?.map((g) => g.genre).join(', ') || 'Неизвестно'}
            </div>
            <div className="movie__average">{movie.rating}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedMoviesList;
