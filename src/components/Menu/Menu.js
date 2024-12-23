import React, { useState, useRef, useEffect } from 'react';
import { IconButton, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { Instagram, Telegram } from '@mui/icons-material';
import { Icon24LogoVk } from '@vkontakte/icons';
import { useSwipeable } from 'react-swipeable';
import { Link } from 'react-router-dom';
import './Menu.css';

function Menu({ open, onClose, phones, menu }) {
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
          {Object.keys(menu).map(key => {
            const menuItem = menu[key];
            return (
              <>
                <ListItem component={Link} to={menuItem.path} onClick={handleClose}>
                  <ListItemText primary={menuItem.name} />
                </ListItem>
                <Divider />
              </>
            );
          })}
          {phones.map(phone => (
            <>
              <ListItem>
                <ListItemText
                  primary={phone.subtitle}
                  secondary={<a href={phone.number}>{phone.name}</a>}
                />
              </ListItem>
              <Divider />
            </>
          ))}
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
            paddingLeft: '16px',
          }}
        >
          *<b>Instagram</b> принадлежит компании Meta, признанной экстремистской организацией и запрещенной в РФ
        </Box>
      </div>
    </div>
  );
}

export default Menu;
