import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HashLink as Link } from 'react-router-hash-link';
import './ServicesMenu.css';
import 'swiper/css';
import 'swiper/css/free-mode';

import { FreeMode } from 'swiper/modules';

import menuData from "../../data/services.json";

let blockHeight;
let firstBlockHeight;

function ServicesMenu() {
    const [fixed, setFixed] = useState(false);
    const wrapperMenuRef = useRef(null);
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const sectionRefs = useRef({});

    useEffect(() => {
        const handleScroll = () => {
            const block = wrapperMenuRef.current;
            const blockTop = block.getBoundingClientRect().top;
            blockHeight = block.offsetHeight;

            firstBlockHeight = document.querySelector(".header-wrapper .content").offsetHeight;
            if (blockTop < firstBlockHeight) {
                setFixed(true);
            } else {
                setFixed(false);
            }

            let currentSection = null;
            Object.keys(sectionRefs.current).forEach(key => {
                const section = sectionRefs.current[key];
                const rect = section.getBoundingClientRect();
                if (rect.top <= 120 && rect.bottom >= 120) {
                    currentSection = key;
                }
            });
            if (currentSection !== null && currentSection !== activeIndex) {
                setActiveIndex(Number(currentSection));
            }
        };

        const handleLoad = () => {
            window.addEventListener('scroll', handleScroll);
        };

        handleLoad();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeIndex]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-110px 0px -99% 0px', // Проверяем пересечение только с верхней границей
            threshold: [0, 1],
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id').split('-')[1];
                    setActiveIndex(Number(id));
                    window.history.replaceState(null, null, `#service-${id}`);
                    scrollToSlide(id);
                }
            });
        }, observerOptions);

        menuData.forEach(service => {
            const element = document.getElementById(`service-${service.id}`);
            if (element) {
                observer.observe(element);
                sectionRefs.current[service.id] = element;
            }
        });

        return () => {
            menuData.forEach(service => {
                const element = document.getElementById(`service-${service.id}`);
                if (element) {
                    observer.unobserve(element);
                }
            });
        };
    })

    const scrollToSlide = (index) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            const counVisibleCategorys = 1
            swiperRef.current.swiper.slideTo(index - counVisibleCategorys, 500, false); // Используйте slideTo или slideToLoop в зависимости от потребностей
        }
    };


    const handleClick = (index) => {
        setActiveIndex(index);
        scrollToSlide(index);
    };

    function scrollWithOffset(el) {
        const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
        const yOffset = -120; // Высота шапки
        window.scrollTo({ top: yCoordinate + yOffset, behavior: 'instant' });
    }

    return (
        <div className='servicesmenu-wrapper' ref={wrapperMenuRef}>
            <div className={`fallback ${fixed ? 'fixed' : ''}`}
                style={{ height: blockHeight }}
            ></div>
            <div className={'servicesmenu' + (fixed ? " fixed" : "")}
                style={{ top: fixed ? firstBlockHeight + 'px' : '' }}
            >
                <div className='content'>
                    <Swiper
                        slidesPerView={'auto'}
                        freeMode={true}
                        modules={[FreeMode]}
                        // centeredSlides={true}
                        ref={swiperRef}
                    >
                        {menuData.map(service => (
                            <SwiperSlide
                                className={`item`}
                                key={service.id}
                            // onClick={() => handleItemClick(service.id)}
                            >
                                <Link
                                    key={service.id}
                                    smooth to={`#service-${service.id}`}
                                    scroll={el => scrollWithOffset(el)}
                                    className={`${activeIndex === service.id ? 'active-service' : ''}`}
                                    onClick={() => handleClick(service.id)}
                                >
                                    {service.name}
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
}

export default ServicesMenu;