import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/UseAuth';
import { db } from '../../api/firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { Box } from '@mui/material';
import MovieCard from '../MovieCard/MovieCard';

const SelectedMoviesList: React.FC<SelectedMoviesListProps> = ({
  currentPage,
  moviesPerPage,
}) => {
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadSelectedMovies = async () => {
      if (!currentUser) return;

      const docRef = doc(db, 'selectedMovies', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const loadedMovies: Movie[] = Object.entries(data.movies || {}).map(
          ([key, movie]) => {
            const typedMovie = movie as Partial<Movie>;
            return {
              ratingKinopoisk: typedMovie.ratingKinopoisk || 0,
              ratingImdb: typedMovie.ratingImdb || 0,
              kinopoiskId: typedMovie.kinopoiskId || parseInt(key, 10),
              filmId: typedMovie.filmId || parseInt(key, 10),
              nameRu: typedMovie.nameRu || '',
              posterUrlPreview: typedMovie.posterUrlPreview || '',
              year: typedMovie.year || '',
              countries: typedMovie.countries || [],
              genres: typedMovie.genres || [],
              rating: typedMovie.rating || 'Н/Д',
            };
          },
        );

        const startIndex = (currentPage - 1) * moviesPerPage;
        const endIndex = startIndex + moviesPerPage;
        setSelectedMovies(loadedMovies.slice(startIndex, endIndex));
      } else {
        console.log('No saved movies');
      }
    };

    loadSelectedMovies();
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
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {selectedMovies.map((movie) => (
          <MovieCard
            key={movie.kinopoiskId || movie.filmId}
            movie={movie}
            isSelected={true}
            onRemove={handleMovieRemove}
            showWatchButton={true}
            onMovieSelect={() => {}}
          />
        ))}
      </Box>
    </Box>
  );
};

export default SelectedMoviesList;
