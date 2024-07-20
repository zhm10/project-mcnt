import React, { useState, useRef } from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import zIndex from '@mui/material/styles/zIndex';

const style = {
    position: 'fixed',
    bottom: "-300px",
    left: 0,
    right: 0,
    bgcolor: 'background.paper',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    margin: "0 20px",
    p: 4,
    paddingBottom: "300px",
    zIndex: 1000,
    height: '80%', // Высота модального окна
};

const AnimatedBox = animated(Box);

const ModalWindow = ({ open, handleClose, title, content, actions }) => {
    const [{ y, opacity }, api] = useSpring(() => ({ y: 1000, opacity: 0 })); // Начальное состояние за пределами экрана
    const modalRef = useRef();

    // Обновление состояния при открытии/закрытии модального окна
    React.useEffect(() => {
        if (open) {
            api.start({ y: 0, opacity: 1 });
        } else {
            api.start({ y: 1000, opacity: 0 });
        }
    }, [open, api]);

    const bind = useDrag(({ down, movement: [, my], memo = y.get() }) => {
        if (!down && my > 100) {
            handleClose();
        } else {
            api.start({ y: down ? memo + my : 0, immediate: down });
        }
        return memo;
    });

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
        //   BackdropProps={{
        //     style: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        //   }}
        >
            <AnimatedBox
                ref={modalRef}
                sx={style}
                style={{ y, opacity }}
                {...bind()}
            >
                <div style={{ position: "relative", height: "60px"}}>
                    <Box mt={3} style={{ position: "absolute", top: 0, right: 0, margin: 0 }}>{actions}</Box>
                </div>
                <Typography id="modal-modal-title" variant="h5" component="h2">
                    <b>{title}</b>
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {content}
                </Typography>
            </AnimatedBox >
        </Modal >
    );
};

export default ModalWindow;
