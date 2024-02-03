import React, { useState, useEffect } from 'react';
import { getClassByRate } from '../../helpers/getClassByRate';
import { useAuth } from '../../hooks/UseAuth';
import { db } from '../../firebase/firebaseConfig';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

type SelectedMoviesListProps = {
  currentPage: number;
  moviesPerPage: number;
};

const SelectedMoviesList: React.FC<SelectedMoviesListProps> = ({
  currentPage,
  moviesPerPage,
}) => {
  const [selectedMovies, setSelectedMovies] = useState<MovieSelect[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    if (currentUser) {
      const loadSelectedMovies = async () => {
        const docRef = doc(db, 'selectedMovies', currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const movies = Object.values(data.movies || {}) as MovieSelect[];
          // Фильтрация и пагинация происходят здесь
          const startIndex = (currentPage - 1) * moviesPerPage;
          const endIndex = startIndex + moviesPerPage;
          setSelectedMovies(movies.slice(startIndex, endIndex));
        } else {
          console.log('No such document!');
        }
      };
      loadSelectedMovies();
    }
  }, [currentUser, currentPage, moviesPerPage]);

  const handleMovieRemove = async (movieId: number | undefined) => {
    if (movieId === undefined || !currentUser) return;

    const docRef = doc(db, 'selectedMovies', currentUser.uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      const updatedMovies = { ...data.movies };
      delete updatedMovies[movieId];
      await updateDoc(docRef, { movies: updatedMovies });
      setSelectedMovies((prevMovies) =>
        prevMovies.filter(
          (m) => m.kinopoiskId !== movieId && m.filmId !== movieId,
        ),
      );
    }
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
            <a
              href={`https://kinopoisk.ru/film/${movie.kinopoiskId || movie.filmId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="movie__watch-button">Смотреть</button>
            </a>
            <div
              className={`movie__average movie__average--${getClassByRate(movie.normalizedRating)}`}
            >
              {movie.normalizedRating}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SelectedMoviesList;
