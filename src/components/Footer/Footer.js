import React, { } from 'react';
import { Container, Box, IconButton } from '@mui/material';
import { Instagram, Telegram } from '@mui/icons-material';
import { Icon24LogoVk } from '@vkontakte/icons';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box className='footer-wrapper' style={{ display: 'flex', background: 'black', color: 'white' }}>
            <Container maxWidth='xl' style={{ margin: '50px 0 0 0' }}>
                <Box style={{ margin: '30px 0 50px 0' }}>Информация размещённая на сайте не является публичной офертой</Box>
                <Box style={{ margin: '30px 0 30px 0' }}>
                    <Box style={{ margin: '0 0 20px 0' }}>
                        <IconButton href="https://instagram.com" color="inherit">
                            <Instagram />
                        </IconButton>
                        <IconButton href="https://t.me" color="inherit">
                            <Telegram />
                        </IconButton>
                        <IconButton href="https://vk.com" color="inherit">
                            <Icon24LogoVk width={28} height={28} />
                        </IconButton>
                    </Box>
                    <Box style={{ margin: '0 0 20px 0' }}>
                        *<b>Instagram</b> принадлежит компании   Meta, признанной экстремистской организацией и запрещенной в РФ
                    </Box>
                    <Box style={{ margin: '0 0 20px 0' }}>Как с нами связаться номер телефона какой-то</Box>
                    <Box style={{ margin: '0 0 0 0' }}>Работа у нас (тоже номер телефона если нужен пункт)</Box>
                </Box>

                <Box style={{ margin: '50px 0 50px 0' }}>
                    <Box style={{ margin: '0 0 10px 0' }}><b>MASTERCAR Detailing</b></Box>
                    <Box style={{ margin: '0 0 10px 0' }}>Developed by <b>ZHM</b></Box>
                    <Box style={{ margin: '0 0 0 0' }}>© 2024 - {currentYear}. Все права защищены.</Box>
                </Box>
            </Container >
        </Box >
    );
}

export default Footer;