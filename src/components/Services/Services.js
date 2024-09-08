import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import useMediaQuery from '@mui/material/useMediaQuery';
import ServicesMenu from '../ServicesMenu/ServicesMenu';
import './Services.css';
import detailingServices from "../../data/services.json";
import defaultImg from "../../assets/HeaderLogo.jpeg";
import ModalWindow from "../Modal/ModalWindow";
import ServiceDescription from './ServiceDescription/ServiceDescription'; // Импортируем новый компонент

const context = require.context('../../assets/services', true);

function Services() {
  const [open, setOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleOpen = (service) => {
    setSelectedService(service);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedService(null);
  };

  // Попытаться загрузить изображение из контекста
  const loadImage = (imageName) => {
    try {
      return context(`./${imageName}`, false, /\.(jpeg|jpg|png)$/);
    } catch {
      return defaultImg; // Если изображение не найдено, вернуть изображение по умолчанию
    }
  };

  // Определяем, является ли текущий экран мобильным
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <Box className='services-wrapper'>
      <ServicesMenu />
      <Container className='services' maxWidth='xl' style={{ margin: '0' }}>
        {detailingServices.map((category, category_index) => (
          <div key={category_index} id={`${category.id}`} className='service-category' data-index={category_index}>
            {isMobile ? (
              <h2 style={{ marginBottom: '20px' }}>{category.name}</h2>
            ) : (
              <h1 style={{ marginBottom: '20px' }}>{category.name}</h1>
            )}
            <Box className='content' sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {category.services.map((service, service_index) => (
                <Card
                  key={service_index}
                  sx={{
                    flex: '1 1 100%', // Занимает всю ширину контейнера
                    mb: 2,
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={loadImage(service.img)}
                    alt={service.name}
                    sx={{
                      width: { xs: '100%', sm: '50%' },
                      height: { xs: 'auto', sm: '100%' },
                    }}
                  />
                  <CardContent
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-evenly',
                      textAlign: { xs: 'center', sm: 'center' },
                      width: { xs: 'auto', sm: '100%' }
                    }}>
                    <Box>
                      <h2>{service.name}</h2>
                      <p>{service.info}</p>
                    </Box>
                    <Box>
                      <Button
                        className='moreDetailed'
                        style={{
                          width: '50%',
                          backgroundColor: '#ffc027',
                          color: 'black',
                          fontWeight: 'bold'
                        }}
                        variant="contained" onClick={() => handleOpen(service)}>
                        Подробнее
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          </div>
        ))}
      </Container>

      {selectedService && (
        <ModalWindow
          open={open}
          handleClose={handleClose}
          image={loadImage(selectedService.img)}
          id={selectedService.id}
          title={selectedService.name}
          content={<ServiceDescription descriptionId={selectedService.descriptionId} />} // Используем новый компонент
        />
      )}
    </Box>
  );
}

export default Services;
