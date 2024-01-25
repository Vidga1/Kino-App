import React from 'react';
import { Link } from 'react-router-dom';
import SearchFilterForm from './SearchFilterForm';
import '../../styles/Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">
          KinoApp
        </Link>
      </div>
      <div className="header__content">
        <Link to="/playlists" className="header__logo">
          Список моих фильмов
        </Link>
      </div>
      <SearchFilterForm />
    </header>
  );
};

export default Header;
