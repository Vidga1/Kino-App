// src/components/AuthModeToggle/AuthModeToggle.tsx
import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

interface AuthModeToggleProps {
  mode: 'login' | 'signup';
  onModeChange: (
    event: React.MouseEvent<HTMLElement>,
    newMode: 'login' | 'signup' | null,
  ) => void;
}

const AuthModeToggle: React.FC<AuthModeToggleProps> = ({
  mode,
  onModeChange,
}) => {
  return (
    <ToggleButtonGroup
      value={mode}
      exclusive
      onChange={onModeChange}
      aria-label="auth mode"
      sx={{ mb: 5 }}
    >
      <ToggleButton
        value="login"
        aria-label="login"
        sx={{
          color: 'white',
          backgroundColor: 'transparent',
          border: '1px solid white',
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&.Mui-selected': {
            color: 'black',
            backgroundColor: 'white',
            border: '1px solid white',
            fontWeight: 'bold',
          },
        }}
      >
        Уже есть аккаунт
      </ToggleButton>
      <ToggleButton
        value="signup"
        aria-label="signup"
        sx={{
          color: 'white',
          backgroundColor: 'transparent',
          border: '1px solid white',
          borderRadius: '8px',
          padding: '8px 16px',
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
          },
          '&.Mui-selected': {
            color: 'black',
            backgroundColor: 'white',
            border: '1px solid white',
            fontWeight: 'bold',
          },
        }}
      >
        Нет аккаунта
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default AuthModeToggle;
