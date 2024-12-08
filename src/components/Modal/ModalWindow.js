import React, { useState, useEffect, useCallback, useRef, Suspense, lazy } from 'react';
import { Modal, Box, IconButton, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
// import ServiceDescription from '../Services/ServiceDescription/ServiceDescription';
import defaultImg from "../../assets/HeaderLogo.jpeg";
import './ModalWindow.css';

const ServiceDescription = lazy(() => import('../Services/ServiceDescription/ServiceDescription'));
const context = require.context('../../assets/services', true);

// Стиль для модального окна
const style = {
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: 'background.paper',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    margin: "0 10px",
    p: 2,
    zIndex: 10,
    height: '85%',
    paddingTop: '10px',
    paddingBottom: '0'
};

const AnimatedBox = animated(Box);

// Определяем, является ли устройство мобильным
const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};

const ModalWindow = ({ open, handleClose, categoryName, service }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const dragHandleRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(open);
    const [isScrollable, setIsScrollable] = useState(false);
    const isMobile = isMobileDevice();
    const content = <ServiceDescription descriptionId={service.id} />;
    const [isLoading, setIsLoading] = useState(true);

    const [{ y }, api] = useSpring(() => ({
        y: 1000,
        config: { tension: 300, friction: 30 },
    }));

    useEffect(() => {
        if (open) {
            setIsModalOpen(true);
            api.start({ y: 0 });
            setIsLoading(true);
        } else {
            api.start({ y: 1000 }).then(() => {
                setIsModalOpen(false);
            });
        }
    }, [open, api]);

    useEffect(() => {
        if (isModalOpen) {
            const timer = setTimeout(() => setIsLoading(false), 500); // Установка задержки загрузки
            return () => clearTimeout(timer);
        }
    }, [isModalOpen]);

    const handleModalClose = useCallback(() => {
        api.start({ y: 1000 });
        setTimeout(() => {
            handleClose();
        }, 300);
    }, [api, handleClose]);

    const startY = useRef(0);
    const currentY = useRef(0);

    const handleTouchStart = (e) => {
        if (dragHandleRef.current && dragHandleRef.current.contains(e.touches[0].target)) {
            startY.current = e.touches[0].clientY;
        } else {
            startY.current = null;
        }
    };

    const handleTouchMove = (e) => {
        if (startY.current !== null) {
            currentY.current = e.touches[0].clientY;
            const deltaY = currentY.current - startY.current;
            if (deltaY > 0) {
                api.start({ y: deltaY, immediate: true });
            }
        }
    };

    const handleTouchEnd = () => {
        if (startY.current !== null) {
            const deltaY = currentY.current - startY.current;
            if (deltaY > 200) {
                handleModalClose();
            } else {
                api.start({ y: 0 });
            }
            startY.current = null;
        }
    };

    const bind = useDrag(
        ({ movement: [, my], memo = y.get(), last, cancel, event }) => {
            if (event.target === dragHandleRef.current || dragHandleRef.current.contains(event.target)) {
                if (my > 300) {
                    cancel();
                    handleModalClose();
                } else if (last) {
                    api.start({ y: 0 });
                } else {
                    api.start({ y: memo + my, immediate: true });
                }
            }
            return memo;
        },
        {
            from: () => [0, y.get()],
            axis: 'y',
            bounds: { top: 0 },
            rubberband: true,
            preventScroll: true,
        }
    );

    const handleScroll = (event) => {
        const isScrollable = event.target.scrollHeight > event.target.clientHeight;
        setIsScrollable(isScrollable);
    };

    // Функция для получения изображения
    const getImageSrc = (image) => {
        try {
            return context(`./${image}`); // Пытаемся получить изображение
        } catch (e) {
            return defaultImg; // Если не удалось, возвращаем заглушку
        }
    };

    return (
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            disableAutoFocus
            style={{ zIndex: 10010 }}
        >
            <AnimatedBox
                sx={style}
                style={{ y }}
                {...(isMobile
                    ? {
                        onTouchStart: handleTouchStart,
                        onTouchMove: handleTouchMove,
                        onTouchEnd: handleTouchEnd,
                        touchAction: 'none',
                    }
                    : bind())}
            >
                {isLoading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <Suspense fallback={<CircularProgress />}><Box
                        style={{
                            display: 'flex',
                            width: '100%',
                            justifyContent: 'center',
                            cursor: isScrollable ? 'default' : 'grab'
                        }}
                        ref={dragHandleRef}
                    >
                        <Box
                            className="close-line"
                            style={{
                                backgroundColor: "grey",
                                height: '3px',
                                margin: '10px 0 30px 0',
                                width: '30%',
                            }}
                        ></Box>
                    </Box>

                        <Box mt={3} style={{ position: "absolute", top: "10px", right: "10px", margin: 0 }}>
                            <IconButton onClick={handleModalClose}>
                                <CloseIcon />
                            </IconButton>
                        </Box>

                        <Box
                            className="animated-box-content"
                            style={{
                                overflowY: 'auto',
                                overflowX: 'hidden',
                                height: '100%',
                            }}
                            onScroll={handleScroll}
                        >
                            <Box>
                                <Box className="service-window-content-info">
                                    <Box className="service-window-slider-image">
                                        {/* Слайдер с динамическими изображениями */}
                                        <Swiper
                                            style={{
                                                '--swiper-navigation-color': '#fff',
                                                '--swiper-pagination-color': '#fff',
                                            }}
                                            spaceBetween={1}
                                            navigation={true}
                                            thumbs={thumbsSwiper ? { swiper: thumbsSwiper } : undefined}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className='main-service-slider-image'
                                        >
                                            {service.images.map((image, index) => (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        src={getImageSrc(image)}
                                                        alt={`Service ${index}`}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                        <Swiper
                                            onSwiper={setThumbsSwiper}
                                            slidesPerView={'auto'}
                                            spaceBetween={1}
                                            freeMode={true}
                                            watchSlidesProgress={true}
                                            modules={[FreeMode, Navigation, Thumbs]}
                                            className='sub-service-slider-images'
                                        >
                                            {service.images.map((image, index) => (
                                                <SwiperSlide key={index}>
                                                    <img
                                                        src={getImageSrc(image)}
                                                        alt={`Service ${index}`}
                                                    />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>
                                    </Box>
                                    <Box className="service-window-header">
                                        <Box className="service-window-header-content">
                                            <h2>{service.name}</h2>
                                            <p>{service.info}</p>
                                            {/* {service.prices && Array.isArray(service.prices) && (
                                                <TableContainer component={Paper}>
                                                    <Table sx={{ width: '100%' }} aria-label="simple table">
                                                        <TableHead>
                                                            <TableRow>
                                                                <TableCell>Услуга</TableCell>
                                                                <TableCell style={{ whiteSpace: 'nowrap' }}>Цена</TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {service.prices.map((row) => (
                                                                <TableRow
                                                                    key={row.name}
                                                                >
                                                                    <TableCell>{row.name}</TableCell>
                                                                    <TableCell style={{ whiteSpace: 'nowrap' }}>{row.price}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            )}
                                            {service.priceInfo && Array.isArray(service.priceInfo) && (
                                                <div className='price-info'>
                                                    {service.priceInfo.map((row, index) => (
                                                        <span key={index}>{row}</span>
                                                    ))}
                                                </div>
                                            )} */}
                                        </Box>
                                    </Box>
                                </Box>

                                <Suspense fallback={<CircularProgress />}>
                                    <Box className='service-window-content-full-description'>
                                        <h2>Подробная информация</h2>
                                        {content}
                                    </Box>
                                    <Box style={{ margin: '30px 0 50px ', fontWeight: 'bold' }}>Информация размещённая на сайте не является публичной офертой</Box>
                                </Suspense>
                            </Box>
                        </Box>
                    </Suspense>
                )
                }
            </AnimatedBox >
        </Modal >
    );
};

export default ModalWindow;
