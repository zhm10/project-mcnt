import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

// Стиль для модального окна
const style = {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    bgcolor: 'background.paper',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    margin: "0 10px",
    p: 4,
    zIndex: 10,
    height: '80%',
};

const AnimatedBox = animated(Box);

// Определяем, является ли устройство мобильным
const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};

const ModalWindow = ({ open, handleClose, title, content }) => {
    const [isModalOpen, setIsModalOpen] = useState(open);
    const isMobile = isMobileDevice();

    // Анимационные параметры для открытия/закрытия
    const [{ y }, api] = useSpring(() => ({
        y: 1000,
        config: { tension: 300, friction: 30 },
    }));

    // Обработка открытия и закрытия модального окна
    useEffect(() => {
        if (open) {
            setIsModalOpen(true);
            api.start({ y: 0 });
            // document.body.style.overflow = 'hidden';  // Отключаем прокрутку
        } else {
            api.start({ y: 1000 }).then(() => {
                setIsModalOpen(false);
                // document.body.style.overflow = 'scroll';  // Включаем прокрутку
            });
        }
    }, [open, api]);

    // Функция для закрытия модального окна
    const handleModalClose = useCallback(() => {
        api.start({ y: 1000 });
        setTimeout(() => {
            handleClose();
            // document.body.style.overflow = 'scroll';  // Включаем прокрутку
        }, 300); // Ожидание завершения анимации
    }, [api, handleClose]);

    // Мобильный способ обработки касания
    const startY = useRef(0);
    const currentY = useRef(0);

    const handleTouchStart = (e) => {
        startY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
        currentY.current = e.touches[0].clientY;
        const deltaY = currentY.current - startY.current;

        if (deltaY > 0) {  // Движение вниз
            api.start({ y: deltaY, immediate: true });
        }
    };

    const handleTouchEnd = () => {
        const deltaY = currentY.current - startY.current;

        if (deltaY > 200) {  // Закрытие, если движение вниз больше 100px
            document.body.style.overflow = 'scroll';  // Включаем прокрутку
            handleModalClose();
        } else {
            api.start({ y: 0 });  // Возврат на место, если меньше 100px
        }
    };

    // Настройка для десктопа через useDrag
    const bind = useDrag(
        ({ movement: [, my], memo = y.get(), last, cancel }) => {
            if (my > 300) { // Закрытие при движении вниз на 300px
                cancel();
                handleModalClose();
            } else if (last) {
                api.start({ y: 0 }); // Возврат на место
            } else {
                api.start({ y: memo + my, immediate: true }); // Перетаскивание
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
                        touchAction: 'none', // Отключаем нативную прокрутку для мобильных
                    }
                    : bind())} // Универсальная обработка для десктопов через useDrag
            >
                <Box mt={3} style={{ position: "absolute", top: "10px", right: "10px", margin: 0 }}>
                    <IconButton onClick={handleModalClose}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    <b>{title}</b>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {content}
                </Typography>
            </AnimatedBox>
        </Modal>
    );
};

export default ModalWindow;
