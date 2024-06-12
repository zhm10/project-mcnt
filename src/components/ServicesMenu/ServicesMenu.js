import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import './ServicesMenu.css';
import 'swiper/css';
import 'swiper/css/free-mode';

import menuData from "../../data/services.json";
import { FreeMode } from 'swiper/modules';

let blockHeight;
let firstBlockHeight;

function ServicesMenu({ activeIndex = null, setActiveIndex = null }) {
    const [fixed, setFixed] = useState(false);
    const wrapperMenuRef = useRef(null);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const block = wrapperMenuRef.current;
            // const block = document.querySelector(".servicesmenu-wrapper");
            const blockTop = block.getBoundingClientRect().top;
            blockHeight = block.offsetHeight;

            firstBlockHeight = document.querySelector(".header-wrapper .content").offsetHeight;
            // console.log("blockTop=" + blockTop, "firstBlockHeight=" + firstBlockHeight);
            if (blockTop < firstBlockHeight) {
                setFixed(true);
            } else {
                setFixed(false);
            }

            menuRef.current.swiper.updateSize();
        };

        const handleLoad = () => {
            window.addEventListener('scroll', handleScroll);
        };

        handleLoad();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const handleItemClick = (index) => {
        setActiveIndex(index);

        const category = document.querySelector('.services .service-id-' + index);
        if (category) {
            const bottomOffset = category.getBoundingClientRect().top + window.pageYOffset - 110;

            window.scrollTo({
                top: bottomOffset,
                behavior: 'instant' // Плавная прокрутка
            });
        }

        const activeElement = menuRef.current.querySelector(`.service-id-${index}`);
        if (activeElement) {
            const parentElement = activeElement.parentElement;
            const containerRect = parentElement.getBoundingClientRect();
            const elementRect = activeElement.getBoundingClientRect();
            const containerWidth = parentElement.clientWidth; // Ширина видимой части контейнера
            const elementWidth = activeElement.offsetWidth; // Ширина выбранного элемента
            const offset = elementRect.left - containerRect.left - (containerWidth - elementWidth) / 2;
            console.log(offset);

            parentElement.scrollTo({
                left: 500, //parentElement.scrollLeft + offset,
                behavior: 'smooth' // Плавная прокрутка
            });
            // menuRef.current.scrollBy(500, 500);
        }
    };





    return (
        <div className='servicesmenu-wrapper' ref={wrapperMenuRef}>
            <div className={`fallback ${fixed ? 'fixed' : ''}`}
                style={{ height: blockHeight }}
            ></div>
            <div className={'servicesmenu' + (fixed ? " fixed" : "")}
                style={{ top: fixed ? firstBlockHeight + 'px' : '' }}
            >
                <Swiper
                    slidesPerView={'auto'}
                    freeMode={true}
                    modules={[FreeMode]}
                    className='content'
                    ref={menuRef}
                >
                    {menuData.map(service => (
                        <SwiperSlide
                            className={`item service-id-${service.id} ${activeIndex === service.id ? 'active-service' : ''}`}
                            key={service.id}
                            onClick={() => handleItemClick(service.id)}
                        >{service.name}</SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default ServicesMenu;