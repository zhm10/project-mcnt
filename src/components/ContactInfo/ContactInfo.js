import React, { useState } from 'react';
import { Typography, Button, Box, Container } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import './ContactInfo.css';
import contactInfo from '../../data/contactsInfo.json';

const ContactInfo = () => {
  const [currentPhone, setCurrentPhone] = useState(contactInfo.phones[0].number);

  return (
    <Box className="contact-info-wrapper">
      <Container className="contact-info" maxWidth='xl' style={{ margin: '0' }}>
        <Box className="contact-info-content">
          <Box className="content-box content-email">
            <Typography className='content-title'>
              Электронная почта:
            </Typography>
            <Typography className='content-paragraph'>
              {contactInfo.emails[0].value}
            </Typography>
          </Box>

          <Box className="content-box content-phone">
            <Typography className='content-title'>
              Телефон:
            </Typography>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000 }}
              onSlideChange={(swiper) => {
                const currentIndex = swiper.realIndex;
                setCurrentPhone(contactInfo.phones[currentIndex].number);
              }}
              modules={[Autoplay]}
              className="phone-swiper"
            >
              {contactInfo.phones.map((phone, index) => (
                <SwiperSlide key={index}>
                  <Typography className='content-paragraph'>
                    <a href={"tel:" + phone.number} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {phone.name}<br/>
                      <Box className="sub-title">({phone.subtitle})</Box>
                    </a>
                  </Typography>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>

          <Box className="content-box content-address">
            <Typography className='content-title'>
              Адрес:
            </Typography>
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000 }}
              modules={[Autoplay]}
              className="addresses-swiper"
            >
              {contactInfo.addresses.map((address, index) => (
                <SwiperSlide key={index}>
                  <Typography key={index} className='content-paragraph'>
                    {"г." + address.city + " Ул. " + address.street}
                  </Typography>
                </SwiperSlide>
              ))}
            </Swiper>
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
            href={"tel:" + currentPhone}
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
