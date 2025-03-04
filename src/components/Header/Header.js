import React, { useState, useEffect } from 'react';
import { Container, IconButton, Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import Menu from '../Menu/Menu';
import headerLogo from "../../assets/HeaderLogoWithoutBackground.png?url";
import './Header.css';
import { Link } from 'react-router-dom';
import menu from '../../data/menu.json';
import contactsInfo from '../../data/contactsInfo.json';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuFilling, setMenuFilling] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(prev => !prev);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

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
        <Box className="content-info">
          <Box className='info-wrapper-logo-and-menu'>
            <Box className="info-logo">
              <img onClick={scrollToTop} src={headerLogo} alt="Header Logo" />
            </Box>
            <Box className='info-menu'>
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
          <Box className='info-phones'>
            <Swiper
              direction="vertical"
              spaceBetween={0}
              slidesPerView={1}
              autoplay={{
                delay: 5000, // Задержка 2 секунды
                disableOnInteraction: false, // Автопрокрутка не останавливается при взаимодействии
              }}
              modules={[Autoplay]}
              loop
              className="phone-slider"
            >
              {contactsInfo.phones.map(phone => (
                <SwiperSlide key={phone.id}>
                  <a href={`tel:${phone.number}`} className="phone-link">
                    {phone.name}<br />
                    <Box className="sub-title">{phone.subtitle}</Box>
                  </a>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          <Box className="content-menu-button">
            <IconButton
              edge="start"
              aria-label="menu"
              className={`menu-icon-button ${menuOpen ? 'open' : ''}`}
              onClick={handleMenuToggle}
            >
              <div className={`menu-icon-container ${menuOpen ? 'open' : ''}`}>
                <div className="menu-icon-bar"></div>
                <div className="menu-icon-bar"></div>
                <div className="menu-icon-bar"></div>
              </div>
            </IconButton>
          </Box>
        </Box>
      </Container >

      <Menu
        open={menuOpen}
        onClose={handleCloseMenu}
        phones={contactsInfo.phones}
        menu={menu}
      />
    </div>
  );
}

export default Header;
