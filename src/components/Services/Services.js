import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Button, Box, Container, Skeleton } from '@mui/material';
import ServicesMenu from '../ServicesMenu/ServicesMenu';
import './Services.css';
import detailingServices from "../../data/services.json";
import defaultImg from "../../assets/HeaderLogo.jpeg";
import ModalWindow from "../Modal/ModalWindow";
import BeforeAfterSlider from '../BeforeAfterSlider/BeforeAfterSlider';

const context = require.context('../../assets/services', true, /\.(jpeg|jpg|png|webp)$/);

const loadImage = (folderName, imageName) => {
    try {
        return context(`./${folderName}/${imageName}`);
    } catch {
        return defaultImg;
    }
};

const ServiceImage = ({ firstImageSrc, secondImageSrc }) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <Box className="section-images">
            {!loaded && (
                <Skeleton
                    variant="rectangular"
                    sx={{
                        width: '100%',
                        height: 300,
                        borderRadius: '4px',
                    }}
                />
            )}
            {secondImageSrc ? (
                <BeforeAfterSlider
                    firstImage={firstImageSrc}
                    secondImage={secondImageSrc}
                    onLoad={() => setLoaded(true)}
                />
            ) : (
                <CardMedia
                    component="img"
                    image={firstImageSrc}
                    alt="Service Image"
                    sx={{ width: '100%', height: 'auto', display: loaded ? 'block' : 'none' }}
                    onLoad={() => setLoaded(true)}
                />
            )}
        </Box>
    );
};

function Services() {
    const [selectedService, setSelectedService] = useState(null);
    const [updateActiveService, setUpdateActiveService] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const descriptionUrlName = 'description';

    const handleOpen = (service) => {
        setSelectedService(service);
        setModalOpen(true);
        window.history.replaceState(null, null, `/#${service.id}/${descriptionUrlName}`);
    };

    const handleClose = () => {
        setModalOpen(false);
        setSelectedService(null);
        window.history.replaceState(null, null, `/#${selectedService.id}`);
    };

    const loadAllImage = (folderName) => {
        try {
            const folderPath = context.keys().filter(key => key.startsWith(`./${folderName}/`));
            const images = folderPath.map(key => context(key));
            return images;
        } catch (e) {
            console.error("Ошибка при загрузке изображений:", e);
            return [];
        }
    };

    return (
        <Box className='services-wrapper'>
            <Container className='services' maxWidth='xl'>
                <div className='section-header'>
                    <h1 className='section-header-title'>Услуги</h1>
                    <p className='section-header-text'>Предлагаем вам широкий спектр по защите и уходу за вашим автомобилем</p>
                </div>
            </Container>
            <ServicesMenu
                updateActiveService={updateActiveService}
                setUpdateActiveService={setUpdateActiveService}
                handleOpen={handleOpen}
                descriptionUrlName={descriptionUrlName}
            />
            <Container className='services' maxWidth='xl'>
                <Box className='services-content' sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                    {detailingServices.map((service) => {
                        const firstImageSrc = loadImage(service.imagesFolderName, service.firstImage);
                        const secondImageSrc = service.secondImage
                            ? loadImage(service.imagesFolderName, service.secondImage)
                            : null;

                        return (
                            <Box key={service.id} id={service.id} className='service-wrapper'>
                                <Card className='service' sx={{ flex: '1 1 100%', mb: 2, display: 'flex' }}>
                                    <ServiceImage firstImageSrc={firstImageSrc} secondImageSrc={secondImageSrc} />
                                    <CardContent className='section-content' sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <Box>
                                            <h2>{service.name}</h2>
                                            <p>{service.info}</p>
                                        </Box>
                                        <Box>
                                            <Button
                                                className='moreDetailed'
                                                style={{ width: '50%', backgroundColor: '#ffc027', color: 'black', fontWeight: 'bold' }}
                                                variant="contained"
                                                onClick={() => handleOpen(service)}
                                            >
                                                Подробнее
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Box>
                        );
                    })}
                </Box>
            </Container>

            {selectedService && (
                <ModalWindow
                    open={modalOpen}
                    handleClose={handleClose}
                    updateActiveService={updateActiveService}
                    setUpdateActiveService={setUpdateActiveService}
                    service={selectedService}
                    images={loadAllImage(selectedService.imagesFolderName)}
                    loadImage={loadImage}
                />
            )}
        </Box>
    );
}

export default Services;
