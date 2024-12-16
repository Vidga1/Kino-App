import React, { useState, useEffect } from 'react';
import { getClassByRate } from '../../helpers/getClassByRate';
import { useAuth } from '../../hooks/UseAuth';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
} from '@mui/material';

interface Country {
  id: string;
  country: string;
}

interface Genre {
  id: string;
  genre: string;
}

interface Movie {
  ratingKinopoisk: number;
  filmId: number;
  kinopoiskId?: number;
  nameRu: string;
  posterUrlPreview?: string;
  year: string;
  countries: Country[];
  genres: Genre[];
  rating: number;
}

interface SelectedMovies {
  [key: string]: Movie;
}

interface MovieListProps {
  movies: Movie[];
  onMovieSelect: (movie: Movie) => void;
}

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
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {movies.map((movie) => {
          const rating = movie.ratingKinopoisk || movie.rating || 'Н/Д';
          const isSelected = selectedMovies[movie.kinopoiskId || movie.filmId];
          const buttonSymbol = isSelected ? '✔' : '+';

          let ratingColor: 'success' | 'warning' | 'error' | 'default' =
            'default';
          if (rating !== 'Н/Д') {
            const numericRating = Number(rating);
            if (!isNaN(numericRating)) {
              if (numericRating >= 7) ratingColor = 'success';
              else if (numericRating >= 5) ratingColor = 'warning';
              else ratingColor = 'error';
            }
          }

          return (
            <Box
              key={movie.kinopoiskId || movie.filmId}
              sx={{
                width: {
                  xs: '100%',
                  sm: 'calc(50% - 24px)',
                  md: 'calc(33.333% - 24px)',
                  lg: 'calc(25% - 24px)', // 4 в ряд на больших экранах
                },
              }}
            >
              <Card
                sx={{
                  bgcolor: '#2d3748',
                  color: '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  '&:hover': {
                    boxShadow: 6,
                  },
                }}
              >
                {movie.posterUrlPreview && (
                  <CardMedia
                    component="img"
                    image={movie.posterUrlPreview}
                    alt={movie.nameRu}
                    sx={{
                      height: 300,
                      objectFit: 'contain',
                      bgcolor: '#000', // тёмный фон за постером
                    }}
                  />
                )}

                <Button
                  variant={isSelected ? 'contained' : 'outlined'}
                  onClick={() => toggleMovieSelection(movie)}
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: isSelected ? '#38a169' : 'rgba(0,0,0,0.6)',
                    color: '#ffffff',
                    borderColor: '#ffffff88',
                    '&:hover': {
                      backgroundColor: isSelected
                        ? '#2f855a'
                        : 'rgba(0,0,0,0.8)',
                    },
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  {buttonSymbol}
                </Button>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ cursor: 'pointer', mb: 1 }}
                    onClick={() => onMovieSelect(movie)}
                  >
                    {movie.nameRu}
                  </Typography>
                  <Typography variant="body2" color="#cbd5e0" sx={{ mb: 0.5 }}>
                    {movie.countries.map((c) => c.country).join(', ')} -{' '}
                    {movie.year}
                  </Typography>
                  <Typography variant="body2" color="#a0aec0" sx={{ mb: 1 }}>
                    Жанры: {movie.genres.map((g) => g.genre).join(', ')}
                  </Typography>
                  <Chip
                    label={`Рейтинг: ${rating}`}
                    color={ratingColor}
                    variant="filled"
                    sx={{
                      fontWeight: 'bold',
                    }}
                  />
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default MovieList;
