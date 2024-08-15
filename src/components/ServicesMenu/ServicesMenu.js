import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import './ServicesMenu.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import menuData from "../../data/services.json";

const ServicesMenu = () => {
    const [fixed, setFixed] = useState(false);
    const wrapperMenuRef = useRef(null);
    const swiperRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeId, setActiveId] = useState(null)
    const sectionRefs = useRef({});

    

    useEffect(() => {
        const initIntersectionObserver = () => {
            const observerOptions = {
                root: null,
                rootMargin: `-100px 0px -${window.innerHeight - 101}px 0px`,
                threshold: [0],
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    const id = entry.target.getAttribute('id');
                    if (entry.isIntersecting) {
                        setActiveId(id);
                        window.history.replaceState(null, null, `/${id}`);
                    } else if (id === menuData[0].id && !entry.isIntersecting) {
                        window.history.replaceState(null, null, "/");
                    }
                });
            }, observerOptions);

            menuData.forEach((service, index) => {
                const element = document.getElementById(`${service.id}`);
                if (element) {
                    observer.observe(element);
                    sectionRefs.current[index] = element;
                }
            });

            return observer;
        };

        const observer = initIntersectionObserver();

        return () => {
            observer.disconnect();
        };
    }, []); // Запустится только один раз при монтировании компонента

    // Логика для прокрутки страницы
    useEffect(() => {
        const handleScroll = () => {
            const block = wrapperMenuRef.current;
            const blockTop = block.getBoundingClientRect().top;
            const firstBlockHeight = document.querySelector(".header-wrapper .content").offsetHeight;

            setFixed(blockTop < firstBlockHeight);

            let currentSection = null;
            Object.keys(sectionRefs.current).forEach(key => {
                const section = sectionRefs.current[key];
                const rect = section.getBoundingClientRect();
                if (rect.top <= 120 && rect.bottom >= 120) {
                    currentSection = key;
                }
            });

            if (currentSection !== null && Number(currentSection) !== activeIndex) {
                setActiveIndex(Number(currentSection));
                scrollToSlide(Number(currentSection));
            }
        };

        const addEventListeners = () => {
            window.addEventListener('scroll', handleScroll);
        };

        const removeEventListeners = () => {
            window.removeEventListener('scroll', handleScroll);
        };

        addEventListeners();

        return () => {
            removeEventListeners();
        };
    }, [activeIndex]); // Запустится при монтировании и на каждый ререндер компонента с изменением activeIndex

    useEffect(() => {

        const handleLoad = () => {
            let pathname = window.location.pathname;
            if (pathname !== '/') {
                pathname = pathname.slice(1);
                const element = document.getElementById(pathname);
                if (element) {
                    setTimeout(() => {
                        scrollToCategory(pathname);
                    }, 100); // Задержка, чтобы элементы успели прорендериться
                }
            }
        };

        if (document.readyState === 'complete') {
            handleLoad();
        } else {
            window.addEventListener('load', handleLoad);
            document.addEventListener('DOMContentLoaded', handleLoad);
        }


        return () => {
            window.removeEventListener('load', handleLoad);
            document.removeEventListener('DOMContentLoaded', handleLoad);
        };
    }, [])

    const scrollToSlide = (index) => {
        if (swiperRef.current && swiperRef.current.swiper) {
            swiperRef.current.swiper.slideTo(index, 1000, false);
        }
    };

    const handleClick = (id, index) => {
        setActiveIndex(Number(index));
        scrollToSlide(index);
        scrollToCategory(id)
    };

    const scrollToCategory = (id) => {
        const element = document.getElementById(`${id}`);
        if (element) {
            const yOffset = isMobile ? -100 : -80; // Высота шапки
            const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            // alert(yCoordinate + " " + window.pageXOffset + " " + yOffset)
            window.scrollTo({ top: yCoordinate, behavior: 'instant' });
            window.history.pushState(null, null, `/${id}`);
        }
    }

    // Определяем, является ли текущий экран мобильным
    const isMobile = useMediaQuery('(max-width:600px)');

    return (
        <div className='servicesmenu-wrapper' ref={wrapperMenuRef}>
            <div className={`fallback ${fixed ? 'fixed' : ''}`} style={{ height: '39px' }} />
            <div
                className={`servicesmenu ${fixed ? "fixed" : ""}`}
                style={{ top: fixed ? `${document.querySelector(".header-wrapper .content").offsetHeight}px` : '', zIndex: 10 }}
            >
                <div className='content'>
                    <Swiper
                        slidesPerView={'auto'}
                        freeMode={true}
                        modules={[FreeMode]}
                        centeredSlides={true}
                        centeredSlidesBounds={true}
                        ref={swiperRef}
                    >
                        {menuData.map((service, service_index) => (
                            <SwiperSlide className={`item`} key={service.id}>
                                <a
                                    key={service.id}
                                    href={`/${service.id}`}
                                    className={`${Number(activeIndex) === service_index ? 'active-service' : ''}`}
                                    data-index={service_index}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(service.id, service_index);
                                    }}
                                >
                                    {service.name}
                                </a>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default ServicesMenu;
