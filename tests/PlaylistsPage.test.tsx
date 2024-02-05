import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import PlaylistsPage from '../src/pages/PlaylistsPage';
import { AuthProvider } from '../src/hooks/UseAuth';

describe('PlaylistsPage UI', () => {
  it('displays the header and navigation buttons', async () => {
    render(
      <Router>
        <AuthProvider>
          <PlaylistsPage />
        </AuthProvider>
      </Router>,
    );

    const header = await screen.findByText('Избранные фильмы');
    const backButton = await screen.findByText('Назад');

    expect(header).toBeInTheDocument();
    expect(backButton).toBeInTheDocument();
  });
});
