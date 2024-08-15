import React, { } from 'react';
import { Container, Box } from '@mui/material';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <Box class='footer-wrapper' style={{ display: 'flex', background: 'black', color: 'white' }}>
            <Container maxWidth='xl' style={{ margin: '50px 0 0 0' }}>
                <Box style={{ margin: '30px 0 50px 0' }}>Информация размещённая на сайте не является публичной офертой</Box>
                <Box style={{ margin: '30px 0 30px 0' }}>
                    <Box style={{ margin: '0 0 20px 0' }}>Иконки соц сетей</Box>
                    <Box style={{ margin: '0 0 20px 0' }}>Как с нами связаться</Box>
                    <Box style={{ margin: '0 0 0 0' }}>Работа у нас</Box>
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