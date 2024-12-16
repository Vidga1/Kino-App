import React, { FC, useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { login, createUser } from '../../firebase/authorization';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Link,
} from '@mui/material';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

const Form: FC<AuthFormProps> = ({ mode }) => {
  const navigate = useNavigate();
  const isLogin = mode === 'login';
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await createUser(email, password);
      }
      navigate('/home');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.error('Unexpected error', error);
      }
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: 'background.paper',
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography component="h1" variant="h5">
          {isLogin ? 'Войти' : 'Регистрация'}
        </Typography>
        <Box sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            variant="outlined"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Пароль"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="outlined"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleAuth}
          >
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              {isLogin ? (
                <Link component={RouterLink} to="/auth/signup" variant="body2">
                  Нет аккаунта? Зарегистрируйтесь
                </Link>
              ) : (
                <Link component={RouterLink} to="/auth/login" variant="body2">
                  Уже есть аккаунт? Войдите
                </Link>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Form;
