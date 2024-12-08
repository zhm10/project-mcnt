import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import useMediaQuery from '@mui/material/useMediaQuery';

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    // Функция для проверки текущего положения прокрутки и обновления состояния видимости
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setVisible(true);
        } else {
            setVisible(false);
        }
    };

    useEffect(() => {
        // Добавляем обработчик события scroll
        window.addEventListener('scroll', handleScroll);

        // Удаляем обработчик при размонтировании компонента
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Функция для плавного скролла к верху
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

     // Определяем, является ли текущий экран мобильным
     const isMobile = useMediaQuery('(max-width:600px)');

    return (
        visible && (
            <IconButton
                onClick={scrollToTop}
                sx={{
                    position: 'fixed',
                    bottom: 30,
                    right: isMobile ? 18 : 26,
                    backgroundColor: '#ffc027',
                    color: 'black',
                    '&:hover': {
                        backgroundColor: '#ffc027', // Сохраняем желтый цвет при наведении
                    },
                    '&:active': {
                        backgroundColor: 'transparent', // Скрываем кнопку при нажатии
                    },
                    '&:focus': {
                        backgroundColor: '#ffc027', // Сохраняем желтый цвет при фокусе
                        outline: 'none', // Убираем стандартное обводку фокуса
                    },
                    transition: 'opacity 0.3s ease', // Плавное скрытие кнопки
                    zIndex:5
                }}
            >
                <ArrowUpwardIcon />
            </IconButton>
        )
    );
};

export default ScrollToTopButton;
