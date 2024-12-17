import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

const navLinks = [
  { to: '/home', label: 'На главную' },
  { to: '/about', label: 'О проекте' },
  { to: '/playlists', label: 'Список моих фильмов' },
];

const Layout: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(to right, #232526, #414345)',
        }}
      >
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            {navLinks.map((link) => (
              <Button
                key={link.to}
                component={NavLink}
                to={link.to}
                sx={{
                  fontSize: '1.1rem',
                  textTransform: 'none',
                  color: 'white',
                  '&.active': {
                    fontWeight: 'bold',
                    borderBottom: '2px solid white',
                  },
                  marginRight: 2,
                }}
              >
                {link.label}
              </Button>
            ))}
          </Box>
          <Box>
            <Button
              component={NavLink}
              to="/auth"
              sx={{
                fontSize: '1.1rem',
                textTransform: 'none',
                color: 'white',
                '&.active': {
                  fontWeight: 'bold',
                  borderBottom: '2px solid white',
                },
              }}
            >
              Выйти из аккаунта
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ padding: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
