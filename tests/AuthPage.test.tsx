import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthPage from '../src/pages/AuthPage';

test('should initially render the login component', () => {
  render(
    <Router>
      <AuthPage />
    </Router>,
  );
  expect(screen.getByText(/перейти в регистрацию/i)).toBeInTheDocument();
});

test('should render the sign up component when the title is clicked', () => {
  render(
    <Router>
      <AuthPage />
    </Router>,
  );
  fireEvent.click(screen.getByText(/перейти в регистрацию/i));
  expect(screen.getByText(/перейти на вход/i)).toBeInTheDocument();
});
