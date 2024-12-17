import React from 'react';
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

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  isSelected,
  onToggleSelect,
  onRemove,
  onMovieSelect,
  showWatchButton = false,
}) => {
  const rating = movie.ratingKinopoisk || movie.rating || 'Н/Д';
  const buttonSymbol = isSelected ? '✔' : '+';

  let ratingColor: 'success' | 'warning' | 'error' | 'default' = 'default';
  let chipStyles: React.CSSProperties = {
    position: 'absolute',
    top: 8,
    left: 8,
    fontWeight: 'bold',
  };

  if (rating !== 'Н/Д') {
    const numericRating = Number(rating);
    if (!isNaN(numericRating)) {
      if (numericRating >= 7) ratingColor = 'success';
      else if (numericRating >= 5) ratingColor = 'warning';
      else ratingColor = 'error';
    }
  } else {
    ratingColor = 'default';
    chipStyles = {
      ...chipStyles,
      backgroundColor: '#fff',
      color: '#000',
    };
  }

  return (
    <Box
      sx={{
        width: {
          xs: '100%',
          sm: 'calc(50% - 24px)',
          md: 'calc(33.333% - 24px)',
          lg: 'calc(25% - 24px)',
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
              bgcolor: '#000',
            }}
          />
        )}

        <Chip
          label={`Рейтинг: ${rating}`}
          color={ratingColor}
          variant="filled"
          style={chipStyles}
        />

        {onToggleSelect && (
          <Button
            variant={isSelected ? 'contained' : 'outlined'}
            onClick={() => onToggleSelect(movie)}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              backgroundColor: isSelected ? '#38a169' : 'rgba(0,0,0,0.6)',
              color: '#ffffff',
              borderColor: '#ffffff88',
              '&:hover': {
                backgroundColor: isSelected ? '#2f855a' : 'rgba(0,0,0,0.8)',
              },
              backdropFilter: 'blur(4px)',
            }}
          >
            {buttonSymbol}
          </Button>
        )}

        {onRemove && (
          <Button
            variant="contained"
            color="error"
            onClick={() => onRemove(movie.kinopoiskId ?? movie.filmId)}
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
        )}

        <CardContent sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: 'pointer', mb: 1 }}
            onClick={() => onMovieSelect && onMovieSelect(movie)}
          >
            {movie.nameRu}
          </Typography>
          <Typography variant="body2" color="#cbd5e0" sx={{ mb: 0.5 }}>
            {movie.countries.map((c) => c.country).join(', ')} - {movie.year}
          </Typography>
          <Typography variant="body2" color="#a0aec0" sx={{ mb: 1 }}>
            Жанры: {movie.genres.map((g) => g.genre).join(', ')}
          </Typography>
          {showWatchButton && (
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
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default MovieCard;
