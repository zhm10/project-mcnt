import React from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import './ContactInfo.css';

const ContactInfo = () => {
  return (
    <Box
      className="contact-info-wrapper"
    >
      <Container className="contact-info" maxWidth='xl' style={{ margin: '0' }}>
        <Box className="contact-info-content">
          <Box className="content-box content-email">
            <Typography className='content-title'>
              Электронная почта:
            </Typography>
            <Typography className='content-paragraph'>
              test@yandex.ru
            </Typography>
          </Box>

          <Box className="content-box content-phone">
            <Typography className='content-title'>
              Телефон:
            </Typography>
            <Typography className='content-paragraph'>
              <a href="tel:7900000000" style={{ color: 'inherit', textDecoration: 'none' }}>
                8 (900) 100-10-10
              </a>
            </Typography>
          </Box>

          <Box className="content-box content-address">
            <Typography className='content-title'>
              Адрес:
            </Typography>
            <Typography className='content-paragraph'>
              Нижний Тагил, ул.<br />
              Красноармейская, 62А
            </Typography>
          </Box>
        </Box>
        <Box className="contact-info-button">
          <Button
            style={{
              width: '230px',
              height: '60px',
              backgroundColor: '#ffc027',
              color: 'black',
              fontWeight: 'bold'
            }}
            variant="contained"
            href="tel:79281268166"
            sx={{ marginTop: 3 }}
          >
            Позвонить
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ContactInfo;
