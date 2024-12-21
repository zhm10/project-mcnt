import React, { useState, useEffect } from 'react';
import { Container, IconButton, Box } from '@mui/material';
import MenuIconCustom from '../Menu/MenuIconCustom/MenuIconCustom';
import Menu from '../Menu/Menu';
import headerLogo from "../../assets/HeaderLogoWithoutBackground.png?url";
import './Header.css';
import { Link } from 'react-router-dom';
import menu from '../../data/menu.json';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuFilling, setMenuFilling] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  // Функция для скролла к верху
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'instant',
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.servicesmenu');

      if (element && element.classList.contains('fixed')) {
        setMenuFilling(true);
      } else {
        setMenuFilling(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <div className="header-wrapper">
      <Container
        className={`content${menuFilling ? ' menuFilling' : ''}`}
        maxWidth={false}
      >
        <Box className="content-menu-button">
          <IconButton
            edge="start"
            aria-label="menu"
            className={`menu-icon-button ${menuOpen ? 'open' : ''}`}
            onClick={handleMenuToggle}
          >
            <MenuIconCustom open={menuOpen} />
          </IconButton>
        </Box>
        <Box className="content-info">
          <Box className="info-logo">
            <img onClick={scrollToTop} src={headerLogo} alt="Header Logo" />
          </Box>
          <Box className='info-menu'>
            {/* Проходим по объекту menu и отображаем пункты меню */}
            {Object.keys(menu).map(key => {
              const menuItem = menu[key];
              return (
                <Link key={key} to={menuItem.path} className="menu-item">
                  {menuItem.name}
                </Link>
              );
            })}
          </Box>
        </Box>
      </Container >

      <Menu open={menuOpen} onClose={handleCloseMenu} />
    </div>
  );
}

export default Header;
