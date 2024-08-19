// Header.js
import React, { useState } from 'react';
import { Container, IconButton } from '@mui/material';
import MenuIconCustom from '../Menu/MenuIconCustom/MenuIconCustom'; // Импортируем новый компонент иконки
import Menu from '../Menu/Menu'; // Импортируем компонент меню
import headerLogo from "../../assets/HeaderLogo.jpeg?url";
import './Header.css';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="header-wrapper">
      <Container
        className="content"
        maxWidth={false}
      >
        <IconButton
          edge="start"
          aria-label="menu"
          className={`menu-icon-button ${menuOpen ? 'open' : ''}`}
          style={{
            position: 'fixed',
            zIndex: 10,
            left: 10,
            top: 4
          }}
          onClick={handleMenuToggle} // Добавлен onClick
        >
          <MenuIconCustom
            open={menuOpen}
          />
        </IconButton>
        <img src={headerLogo} alt="Header Logo" />
      </Container >

      <Menu open={menuOpen} onClose={handleCloseMenu} />
    </div>
  );
}

export default Header;
