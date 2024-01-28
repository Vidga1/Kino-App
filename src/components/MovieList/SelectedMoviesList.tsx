import React, { useState, useEffect } from 'react';

const SelectedMoviesList: React.FC = () => {
  const [selectedMovies, setSelectedMovies] = useState<MovieSelect[]>([]);

  useEffect(() => {
    const rawStoredMovies = localStorage.getItem('selectedMovies') || '{}';
    const storedMovies: Record<string, unknown> = JSON.parse(rawStoredMovies);
    const filteredMovies = Object.values(storedMovies).filter((movie) => {
      const isMovieSelect =
        (movie as MovieSelect).kinopoiskId || (movie as MovieSelect).filmId;
      return isMovieSelect;
    }) as MovieSelect[];

    setSelectedMovies(filteredMovies);
  }, []);

  if (selectedMovies.length === 0) {
    return <div>Нет выбранных фильмов</div>;
  }

  return (
    <div className="movies">
      {selectedMovies.map((movie, index) => (
        <div key={movie.kinopoiskId || movie.filmId || index} className="movie">
          <div className="movie__cover-inner">
            <img
              src={movie.posterUrlPreview}
              className="movie__cover"
              alt={movie.nameRu}
            />
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
