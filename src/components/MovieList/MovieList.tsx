import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/UseAuth';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Box } from '@mui/material';
import MovieCard from '../MovieCard/MovieCard';

const MovieList: React.FC<MovieListProps> = ({ movies, onMovieSelect }) => {
  const { currentUser } = useAuth();
  const [selectedMovies, setSelectedMovies] = useState<SelectedMovies>({});

  useEffect(() => {
    const loadSelectedMovies = async () => {
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'selectedMovies', currentUser.uid);
          const docSnap = await getDoc(userDocRef);

          if (docSnap.exists() && docSnap.data().movies) {
            setSelectedMovies(docSnap.data().movies);
          } else {
            console.log('No saved movies');
          }
        } catch (error) {
          console.error('Error loading selected movies:', error);
        }
      }
    };

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

    try {
      const userDocRef = doc(db, 'selectedMovies', currentUser.uid);
      await setDoc(userDocRef, { movies: updatedSelectedMovies });
    } catch (error) {
      console.error('Error updating selected movies:', error);
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
        {movies.map((movie) => {
          const isSelected = selectedMovies[movie.kinopoiskId || movie.filmId];
          return (
            <MovieCard
              key={movie.kinopoiskId || movie.filmId}
              movie={movie}
              isSelected={!!isSelected}
              onToggleSelect={toggleMovieSelection}
              onMovieSelect={onMovieSelect}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default MovieList;
