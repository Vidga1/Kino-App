import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthContext';
import HomePage from './pages/HomePage';
import PlaylistsPage from './pages/PlaylistsPage';
import AuthPage from './pages/AuthPage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/playlists" element={<PlaylistsPage />} />
        <Route path="/filters" element={<HomePage />} />
        <Route path="/search" element={<HomePage />} />
        <Route path="*" element={<Navigate replace to="/auth" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
