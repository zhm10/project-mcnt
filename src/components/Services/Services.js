import React, { useState } from 'react';
import { Button, Container, Box } from '@mui/material';
import ServicesMenu from '../ServicesMenu/ServicesMenu';
import './Services.css';
import detailingServices from "../../data/services.json";
import defaultImg from "../../assets/services/Car1.jpeg";
import ModalWindow from "../Modal/ModalWindow";
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

    return (
        <Box className='services-wrapper'>
            <ServicesMenu />
            <Container className='services' maxWidth='xl' style={{margin: '50px 0 0 0'}}>
                {detailingServices.map((category, category_index) => (
                    <div
                        key={category_index}
                        id={`${category.id}`}
                        className={`service-category`}
                        data-index={category_index}
                    >
                        <h1>{category.name}</h1>
                        <div className='content'>
                            {category.services.map((service, service_index) => (
                                <div key={service_index} className='service'>
                                    <div className='content'>
                                        <img src={loadImage(service.img)} alt={service.name} />
                                        <h3>{service.name}</h3>
                                        <p>{service.info}</p>
                                        <Button variant="contained" onClick={() => handleOpen(service)}>
                                            Подробнее
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </Container>

            {selectedService && (
                <ModalWindow
                    open={open}
                    handleClose={handleClose}
                    title={selectedService.name}
                    content={selectedService.info}
                />
            )}
        </Box>
    );
}

export default Services;
