import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import HomePage from '../src/pages/HomePage';

describe('HomePage', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <HomePage />
      </Router>,
    );
  });
});
