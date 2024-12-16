import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CardMedia,
  Link,
  Box,
} from '@mui/material';

interface Country {
  id: string;
  country: string;
}

interface Genre {
  id: string;
  genre: string;
}

interface MovieDetails {
  filmId: number;
  kinopoiskId?: number;
  nameRu: string;
  description: string;
  year: string;
  posterUrl: string;
  posterUrlPreview?: string;
  countries: Country[];
  genres: Genre[];
  rating: number;
  filmLength?: number;
  webUrl?: string;
  ratingKinopoisk?: number;
}

interface ModalProps {
  movie: MovieDetails;
  onClose: () => void;
  isModalOpen: boolean;
}

const Modal: React.FC<ModalProps> = ({ movie, onClose, isModalOpen }) => {
  return (
    <Dialog
      open={isModalOpen}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      sx={{
        '& .MuiDialog-paper': {
          bgcolor: '#2d3748',
          color: '#ffffff',
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h6" component="div">
          {movie.nameRu}{' '}
          <Typography component="span" color="#cbd5e0">
            ({movie.year})
          </Typography>
        </Typography>
      </DialogTitle>
      <DialogContent dividers>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
          }}
        >
          {movie.posterUrl && (
            <CardMedia
              component="img"
              image={movie.posterUrl}
              alt={movie.nameRu}
              sx={{
                width: { xs: '100%', md: '300px' },
                height: 'auto',
                borderRadius: 1,
              }}
            />
          )}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body1">
              <strong>Жанр:</strong>{' '}
              {movie.genres.map((g) => g.genre).join(', ')}
            </Typography>
            {movie.filmLength && (
              <Typography variant="body1">
                <strong>Время:</strong> {movie.filmLength} минут
              </Typography>
            )}
            {movie.webUrl && (
              <Typography variant="body1">
                <strong>Сайт: </strong>
                <Link
                  href={movie.webUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  sx={{ color: '#63b3ed' }}
                >
                  {movie.webUrl}
                </Link>
              </Typography>
            )}
            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Описание:</strong> {movie.description}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="primary" onClick={onClose}>
          Закрыть
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
