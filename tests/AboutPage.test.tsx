import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import AboutPage from '../src/pages/AboutPage';

describe('AboutPage', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <AboutPage />
      </BrowserRouter>,
    );
  });

  afterEach(cleanup);

  test('renders without crashing', () => {
    expect(screen.getByText(/о проекте/i)).toBeInTheDocument();
  });

  test('contains back to home link', () => {
    expect(screen.getByText(/назад/i).closest('a')).toHaveAttribute(
      'href',
      '/home',
    );
  });

  test('contains project description', () => {
    expect(
      screen.getByText(/этот проект — настоящий помощник для любителей кино/i),
    ).toBeInTheDocument();
  });
});
