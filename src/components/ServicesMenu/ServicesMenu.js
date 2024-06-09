import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import './ServicesMenu.css';
import 'swiper/css';
import 'swiper/css/free-mode';

import menuData from "../../data/services.json";
import { FreeMode, Pagination } from 'swiper/modules';

let blockHeight;
let firstBlockHeight;

function ServicesMenu() {
    const [fixed, setFixed] = useState(false);
    const [activeBlock, setActiveBLock] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const block = document.querySelector(".servicesmenu-wrapper");
            const blockTop = block.getBoundingClientRect().top;
            blockHeight = block.offsetHeight;
    
            firstBlockHeight = document.querySelector(".header-wrapper .content").offsetHeight;
            console.log("blockTop=" + blockTop, "firstBlockHeight=" + firstBlockHeight);
            if (blockTop < firstBlockHeight) {
                setFixed(true);
            } else {
                setFixed(false);
            }
        };
    
        const handleLoad = () => {
            window.addEventListener('scroll', handleScroll);
        };
    
        handleLoad();
    
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    

    // useEffect2(() => {
    //     const handleScroll = () => {
    //         const block = document.querySelector(".servicesmenu-wrapper");
    //         const blockTop = block.getBoundingClientRect().top;
    //         // const blockBottom = document.querySelector(".services").getBoundingClientRect().bottom;
    //         blockHeight = block.offsetHeight;

    //         // Высота первого блока
    //         firstBlockHeight = document.querySelector(".header-wrapper .content").offsetHeight; // Пример высоты первого блока
    //         // console.log("blockTop=" + blockTop, "blockBottom=" + blockBottom, "firstBlockHeight=" + firstBlockHeight);
    //         if (blockTop <= firstBlockHeight) {
    //             alert("success")
    //             setFixed(true);
    //         } else {
    //             setFixed(false);
    //         }
    //     };

    //     const handleLoad = () => {
    //         // Добавляем обработчик события прокрутки
    //         window.addEventListener('scroll', handleScroll);

    //         // Вызываем функцию handleScroll один раз при загрузке компонента
    //         // handleScroll();
    //     };

    //     // Ждем полной загрузки страницы
    //     window.addEventListener('load', handleLoad);

    //     // Убираем обработчики событий при размонтировании компонента
    //     return () => {
    //         window.removeEventListener('scroll', handleScroll);
    //         window.removeEventListener('load', handleLoad);
    //     };
    // }, []);

    return (
        <div className='servicesmenu-wrapper'>
            <div className={"fallback"}
                style={{
                    display: fixed ? "block" : 'none',
                    height: blockHeight
                }}
            ></div>
            <div className={'servicesmenu' + (fixed ? " fixed" : "")}
                style={{
                    position: fixed ? 'fixed' : 'inherit',
                    top: fixed ? firstBlockHeight + 'px' : ''
                }}
            >
                <Swiper
                    slidesPerView={"auto"}
                    freeMode={true}
                    modules={[FreeMode, Pagination]}
                    className='content'
                >

                    {menuData.map(service => (
                        <SwiperSlide key={service.id} className='item'>{service.name}</SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ServicesMenu;