import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PlaylistsPage from '../src/pages/PlaylistsPage';

describe('PlaylistsPage Component', () => {
  it('renders without crashing', () => {
    render(
      <BrowserRouter>
        <PlaylistsPage />
      </BrowserRouter>,
    );
    expect(screen.getByText('Избранные фильмы')).toBeInTheDocument();
  });
});
