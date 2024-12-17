import React, { useState } from 'react';
import Form from '../../components/Form/Form';
import { Box, Typography } from '@mui/material';
import AuthModeToggle from '../../components/ToggleButton/ToggleButton';

const AuthPage: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  const handleModeChange = (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'login' | 'signup' | null,
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#121212',
        padding: 2,
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom color="#ffffff">
        Добро пожаловать
      </Typography>
      <AuthModeToggle mode={mode} onModeChange={handleModeChange} />
      <Form mode={mode} />
    </Box>
  );
};

export default AuthPage;
