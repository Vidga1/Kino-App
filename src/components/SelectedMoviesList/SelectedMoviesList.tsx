import React, { useState, useEffect } from 'react';
import { getClassByRate } from '../../helpers/getClassByRate';
import { useAuth } from '../../hooks/UseAuth';
import { db } from '../../firebase/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Chip,
  Link,
} from '@mui/material';

interface MovieSelect {
  normalizedRating: React.ReactNode;
  ratingKinopoisk: number;
  ratingImdb: number;
  kinopoiskId?: number;
  filmId?: number;
  nameRu?: string;
  posterUrlPreview?: string;
  year?: string;
  countries?: Array<{ country: string }>;
  genres?: Array<{ genre: string }>;
  rating?: string;
}

interface SelectedMoviesListProps {
  currentPage: number;
  moviesPerPage: number;
}

const SelectedMoviesList: React.FC<SelectedMoviesListProps> = ({
  currentPage,
  moviesPerPage,
}) => {
  const [selectedMovies, setSelectedMovies] = useState<MovieSelect[]>([]);
  const { currentUser } = useAuth();

  useEffect(() => {
    const loadSelectedMovies = async () => {
      if (!currentUser) return;

      const docRef = doc(db, 'selectedMovies', currentUser.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        const loadedMovies: MovieSelect[] = Object.entries(
          data.movies || {},
        ).map(([key, movie]) => {
          const typedMovie = movie as Partial<MovieSelect>;
          return {
            ...typedMovie,
            ratingKinopoisk: typedMovie.ratingKinopoisk || 0,
            ratingImdb: typedMovie.ratingImdb || 0,
            kinopoiskId: typedMovie.kinopoiskId || parseInt(key, 10),
            filmId: typedMovie.filmId || parseInt(key, 10),
            normalizedRating: getClassByRate(
              typedMovie.ratingKinopoisk || typedMovie.rating || 'Н/Д',
            ),
            nameRu: typedMovie.nameRu || '',
            posterUrlPreview: typedMovie.posterUrlPreview || '',
            year: typedMovie.year || '',
            countries: typedMovie.countries || [],
            genres: typedMovie.genres || [],
            rating: typedMovie.rating || '',
          };
        });

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
      {/* Разметка для 4 в ряд (как было с Grid lg={3}) */}
      {/* xs: 1 в ряд, sm: 2, md: 3, lg: 4 */}
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 3,
        }}
      >
        {selectedMovies.map((movie) => {
          const ratingValue = movie.ratingKinopoisk || movie.rating || 'Н/Д';
          let ratingColor: 'success' | 'warning' | 'error' | 'default' =
            'default';
          if (ratingValue !== 'Н/Д') {
            const numericRating = Number(ratingValue);
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
                      objectFit: 'cover', // вернуть как было, "cover" вместо "contain"
                    }}
                  />
                )}

                <Button
                  variant="contained"
                  color="error"
                  onClick={() =>
                    handleMovieRemove(movie.kinopoiskId ?? movie.filmId)
                  }
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    backgroundColor: '#e53e3e',
                    '&:hover': {
                      backgroundColor: '#c53030',
                    },
                    backdropFilter: 'blur(4px)',
                  }}
                >
                  ✕
                </Button>

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="div" sx={{ mb: 1 }}>
                    {movie.nameRu}
                  </Typography>
                  <Typography variant="body2" color="#cbd5e0" sx={{ mb: 0.5 }}>
                    {movie.countries?.map((c) => c.country).join(', ') ||
                      'Неизвестно'}{' '}
                    - {movie.year}
                  </Typography>
                  <Typography variant="body2" color="#a0aec0" sx={{ mb: 1 }}>
                    Жанры:{' '}
                    {movie.genres?.map((g) => g.genre).join(', ') ||
                      'Неизвестно'}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <Link
                      href={`https://kinopoisk.ru/film/${movie.kinopoiskId || movie.filmId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      underline="none"
                      sx={{
                        color: '#4299e1',
                        '&:hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Button variant="outlined" color="primary">
                        Смотреть
                      </Button>
                    </Link>
                    <Chip
                      label={`Рейтинг: ${ratingValue}`}
                      color={ratingColor}
                      variant="filled"
                      sx={{
                        fontWeight: 'bold',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SelectedMoviesList;
