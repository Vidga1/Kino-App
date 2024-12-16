import React, { useState, useEffect } from 'react';
import { getClassByRate } from '../../helpers/getClassByRate';
import { useAuth } from '../../hooks/UseAuth';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieSelect }) => {
  const { currentUser } = useAuth();
  const [selectedMovies, setSelectedMovies] = useState<SelectedMovies>({});

  useEffect(() => {
    async function loadSelectedMovies() {
      if (currentUser) {
        const userDocRef = doc(db, 'selectedMovies', currentUser.uid);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists() && docSnap.data().movies) {
          setSelectedMovies(docSnap.data().movies);
        } else {
          console.log('No saved movies');
        }
      }
    }

    loadSelectedMovies();
  }, [currentUser]);

  const toggleMovieSelection = async (movie: Movie) => {
    if (!currentUser) return;

    const movieId = String(movie.kinopoiskId || movie.filmId);
    const updatedSelectedMovies = { ...selectedMovies };

    if (updatedSelectedMovies[movieId]) {
      delete updatedSelectedMovies[movieId];
    } else {
      updatedSelectedMovies[movieId] = movie;
    }

    setSelectedMovies(updatedSelectedMovies);

    const userDocRef = doc(db, 'selectedMovies', currentUser.uid);
    await setDoc(userDocRef, { movies: updatedSelectedMovies });
  };

  return (
    <div className="movies">
      {movies.map((movie) => {
        const rating = movie.ratingKinopoisk || movie.rating || 'Н/Д';
        const isSelected = selectedMovies[movie.kinopoiskId || movie.filmId];
        const buttonSymbol = isSelected ? '✔' : '+';

        return (
          <div key={movie.kinopoiskId || movie.filmId} className="movie">
            <div className="movie__cover-inner">
              <img
                src={movie.posterUrlPreview}
                className="movie__cover"
                alt={movie.nameRu}
              />
              <button
                className="movie__select-button"
                onClick={() => toggleMovieSelection(movie)}
              >
                {buttonSymbol}
              </button>
            </div>
            <div className="movie__info">
              <div
                className="movie__title"
                onClick={() => onMovieSelect(movie)}
              >
                {movie.nameRu}
              </div>
              <div className="movie__details">
                {movie.countries.map((c) => c.country).join(', ')} -{' '}
                {movie.year}
              </div>
              <div className="movie__category">
                {movie.genres.map((g) => g.genre).join(', ')}
              </div>
              <div
                className={`movie__average movie__average--${getClassByRate(rating)}`}
              >
                {rating}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MovieList;
