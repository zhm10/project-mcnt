import React, { useState, useRef, useEffect } from 'react';
import { IconButton, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { Instagram, Telegram } from '@mui/icons-material';
import { Icon24LogoVk } from '@vkontakte/icons';
import { useSwipeable } from 'react-swipeable';
import './Menu.css';

function Menu({ open, onClose }) {
  const [menuOpen, setMenuOpen] = useState(open);
  const menuRef = useRef(null);

  const swipeHandlers = useSwipeable({
    onSwipedUp: () => {
      setMenuOpen(false);
      onClose();
    },
    onSwipedDown: () => {
      setMenuOpen(true);
    },
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    setMenuOpen(open);

    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'scroll';
    }
  }, [open]);

  const handleClose = () => {
    setMenuOpen(false);
    onClose();
  };

  return (
    <div
      className={`menu-container ${menuOpen ? 'open' : 'closed'}`}
      ref={menuRef}
      {...swipeHandlers}
    >
      <div className="menu-content">
        <List>
          <ListItem button onClick={handleClose}>
            <ListItemText primary="Главная" />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleClose}>
            <ListItemText primary="О нас" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Сотрудничать с нами:"
              secondary={<a href="tel:+79001111111">+7 (900) 111-11-11</a>}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText
              primary="Работать у нас:"
              secondary={<a href="tel:+79004444444">+7 (900) 444-44-44</a>}
            />
          </ListItem>

          <Divider />

          {/* Социальные сети */}
          <ListItem>
            <IconButton href="https://instagram.com" color="inherit">
              <Instagram />
            </IconButton>
            <IconButton href="https://t.me" color="inherit">
              <Telegram />
            </IconButton>
            <IconButton href="https://vk.com" color="inherit">
              <Icon24LogoVk width={28} height={28} />
            </IconButton>
          </ListItem>
        </List>
        <Box
          style={{
            paddingLeft: '16px'
          }}
        >
          *<b>Instagram</b> принадлежит компании   Meta, признанной экстремистской организацией и запрещенной в РФ
        </Box>
      </div>
    </div>
  );
}

export default Menu;
