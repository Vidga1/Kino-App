import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/Main/Main';
import PlaylistsPage from './pages/Playlists/Playlists';
import AuthPage from './pages/Auth/Auth';
import AboutPage from './pages/About/About';
import Layout from './components/Layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="playlists" element={<PlaylistsPage />} />
        <Route path="filters" element={<HomePage />} />
        <Route path="search" element={<HomePage />} />
        <Route path="*" element={<Navigate replace to="/home" />} />
      </Route>
      <Route path="/auth" element={<AuthPage />} />
      <Route path="*" element={<Navigate replace to="/auth" />} />
    </Routes>
  );
}
export default App;
