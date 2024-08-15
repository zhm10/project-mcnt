import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useSpring, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';

const style = {
    position: 'fixed',
    bottom: "-300px",
    left: 0,
    right: 0,
    bgcolor: 'background.paper',
    borderTopLeftRadius: '16px',
    borderTopRightRadius: '16px',
    margin: "0 10px",
    p: 4,
    paddingBottom: "300px",
    zIndex: 10,
    height: '80%',
};

const AnimatedBox = animated(Box);

const ModalWindow = ({ open, handleClose, title, content }) => {
    const [isModalOpen, setIsModalOpen] = useState(open);

    const [{ y, opacity }, api] = useSpring(() => ({
        y: 1000,
        opacity: 0,
        config: { duration: 300 },
    }));

    useEffect(() => {
        if (open) {
            setIsModalOpen(true);
            api.start({ y: 0, opacity: 1 });
        } else {
            api.start({ y: 1000, opacity: 0 }).then(() => {
                setIsModalOpen(false);
            });
        }
    }, [open, api]);

    const bind = useDrag(
        ({ down, movement: [, my], memo = y.get() }) => {
            if (!down && my > 100) {
                document.body.style.overflow = 'scroll';
                handleModalClose();
            } else {
                document.body.style.overflow = 'hidden';
                api.start({ y: down ? Math.max(memo + my, 0) : 0, immediate: down });
            }
            return memo;
        },
        { axis: 'y' }
    );

    const handleModalClose = useCallback(() => {
        api.start({ y: 1000, opacity: 0 });
        setTimeout(() => {
            handleClose();
        }, 100); // Убедитесь, что это соответствует длительности анимации
    }, [api, handleClose]);

    return (
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            disableAutoFocus
            style={{zIndex: 10010}}
        >
            <AnimatedBox
                sx={style}
                style={{ y, opacity }}
                {...bind()}
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
