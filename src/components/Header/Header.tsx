import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Header.css';

const Header: React.FC = () => {
  const handleReload = () => {
    window.location.reload();
  };
  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo">
          На главную
        </Link>
      </div>
      <div className="header__content">
        <Link to="/playlists" className="header__logo">
          Список моих фильмов
        </Link>
      </div>
    </header>
  );
};

export default Header;
