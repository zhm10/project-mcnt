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
    p: 2,
    zIndex: 10,
    height: '85%',
    paddingTop: '10px'
};

const AnimatedBox = animated(Box);

// Определяем, является ли устройство мобильным
const isMobileDevice = () => {
    return /Mobi|Android/i.test(navigator.userAgent);
};

const ModalWindow = ({ open, handleClose, title, content, image }) => {
    // Реф для шторки захвата
    const dragHandleRef = useRef(null);
    const [isModalOpen, setIsModalOpen] = useState(open);
    const [isScrollable, setIsScrollable] = useState(false);
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
        } else {
            api.start({ y: 1000 }).then(() => {
                setIsModalOpen(false);
            });
        }
    }, [open, api]);

    // Функция для закрытия модального окна
    const handleModalClose = useCallback(() => {
        api.start({ y: 1000 });
        setTimeout(() => {
            handleClose();
        }, 300); // Ожидание завершения анимации
    }, [api, handleClose]);

    // Мобильный способ обработки касания
    const startY = useRef(0);
    const currentY = useRef(0);

    const handleTouchStart = (e) => {
        if (dragHandleRef.current && dragHandleRef.current.contains(e.touches[0].target)) {
            startY.current = e.touches[0].clientY;
        } else {
            startY.current = null; // Запрещаем перетаскивание, если не в области захвата
        }
    };

    const handleTouchMove = (e) => {
        if (startY.current !== null) {
            currentY.current = e.touches[0].clientY;
            const deltaY = currentY.current - startY.current;
            if (deltaY > 0) {  // Движение вниз
                api.start({ y: deltaY, immediate: true });
            }
        }
    };

    const handleTouchEnd = () => {
        if (startY.current !== null) {
            const deltaY = currentY.current - startY.current;
            if (deltaY > 200) {  // Закрытие, если движение вниз больше 200px
                handleModalClose();
            } else {
                api.start({ y: 0 });  // Возврат на место, если меньше 200px
            }
            startY.current = null; // Сбрасываем состояние касания
        }
    };

    // Настройка для десктопа через useDrag
    const bind = useDrag(
        ({ movement: [, my], memo = y.get(), last, cancel, event }) => {
            // Проверка, что перетаскивание началось в верхней части модального окна или в специальной шторке
            if (event.target === dragHandleRef.current || dragHandleRef.current.contains(event.target)) {
                if (my > 300) { // Закрытие при движении вниз на 300px
                    cancel();
                    handleModalClose();
                } else if (last) {
                    api.start({ y: 0 }); // Возврат на место
                } else {
                    api.start({ y: memo + my, immediate: true }); // Перетаскивание
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

    // Обработчик для прокрутки
    const handleScroll = (event) => {
        const isScrollable = event.target.scrollHeight > event.target.clientHeight;
        setIsScrollable(isScrollable);
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
                        touchAction: 'none', // Отключаем нативную прокрутку для мобильных
                    }
                    : bind())} // Универсальная обработка для десктопов через useDrag
            >
                {/* Шторка для захвата */}
                <Box
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
                        overflow: 'auto',
                        height: '100%',
                    }}
                    onScroll={handleScroll} // Обработчик прокрутки
                >
                    <Box
                        style={{
                            'paddingBottom': '100px'
                        }}
                    >
                        {image && (
                            <Box
                                component="img"
                                src={image}
                                alt="Modal Header"
                                sx={{
                                    width: '100%',
                                    height: 'auto',
                                    maxHeight: '300px',
                                    borderTopLeftRadius: '16px',
                                    borderTopRightRadius: '16px',
                                }}
                            />
                        )}
                        <Box className='Content'>{content}</Box>
                    </Box>
                </Box>
            </AnimatedBox>
        </Modal >
    );
};

export default ModalWindow;
