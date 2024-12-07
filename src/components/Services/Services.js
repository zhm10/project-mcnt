import React, { useState, useEffect } from 'react';
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

const context = require.context('../../assets/services', true);

function Services() {
    const [selectedService, setSelectedService] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateActiveCategory, setUpdateActiveCategory] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpen = (category, service) => {
        setSelectedCategory(category);
        setSelectedService(service);
        setModalOpen(true);

        window.history.replaceState(null, null, `/#${category.id}/${service.id}`);
    };

    const handleClose = () => {
        setModalOpen(false);
        // setSelectedCategory(null);
        setSelectedService(null);
        window.history.replaceState(null, null, `#${selectedCategory.id}`);
    };

    const loadImage = (imageName) => {
        try {
            return context(`./${imageName}`, false, /\.(jpeg|jpg|png)$/);
        } catch {
            return defaultImg;
        }
    };

    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const hash = window.location.hash.slice(1);
        const pathService = window.location.hash.split("/").pop();

        if (hash) {
            const element = document.getElementById(hash);
            if (element) {
                setTimeout(() => {
                    element.scrollIntoView({ behavior: 'instant' });
                }, 100);
            }
            if (pathService && pathService !== hash) {
                let selectedCategory;
                const service = detailingServices.find(category => {
                    const foundService = category.services.find(service => service.id === pathService);
                    if (foundService) {
                        selectedCategory = category;
                        return true;
                    }
                    return false;
                })?.services.find(service => service.id === pathService);

                if (service) {
                    setSelectedCategory(selectedCategory);
                    setSelectedService(service);
                    setModalOpen(true);
                }
            }
        }
    }, []);

    return (
        <Box className='services-wrapper'>
            <ServicesMenu
                updateActiveCategory={updateActiveCategory}
                setUpdateActiveCategory={setUpdateActiveCategory}
            />
            <Container className='services' maxWidth='xl' style={{ margin: '0' }}>
                {detailingServices.map((category) => (
                    <div key={category.id} id={category.id} className='service-category'>
                        {isMobile ? (
                            <h2 style={{ marginBottom: '20px' }}>{category.name}</h2>
                        ) : (
                            <h1 style={{ marginBottom: '20px' }}>{category.name}</h1>
                        )}
                        <Box className='content' sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                            {category.services.map((service) => (
                                <Card key={service.id} sx={{ flex: '1 1 100%', mb: 2, display: 'flex' }}>
                                    <CardMedia
                                        component="img"
                                        image={loadImage(service.img)}
                                        alt={service.name}
                                        sx={{ width: { xs: '100%', sm: '50%' }, height: { xs: 'auto', sm: '100%' } }}
                                    />
                                    <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                                        <Box>
                                            <h2>{service.name}</h2>
                                            <p>{service.info}</p>
                                        </Box>
                                        <Box>
                                            <Button
                                                className='moreDetailed'
                                                style={{ width: '50%', backgroundColor: '#ffc027', color: 'black', fontWeight: 'bold' }}
                                                variant="contained"
                                                onClick={() => handleOpen(category, service)}>
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
                    open={modalOpen}
                    handleClose={handleClose}
                    updateActiveCategory={updateActiveCategory}
                    setUpdateActiveCategory={setUpdateActiveCategory}
                    categoryName={selectedCategory.name}
                    service={selectedService}
                />
            )}
        </Box>
    );
}

export default Services;
