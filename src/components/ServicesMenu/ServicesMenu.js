import React, { useRef, useState, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import { Swiper, SwiperSlide } from 'swiper/react';
import './ServicesMenu.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import menuData from "../../data/services.json";

const ServicesMenu = ({ updateActiveService, setUpdateActiveService, handleOpen, descriptionUrlName }) => {
    const [fixed, setFixed] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const swiperRef = useRef(null);
    const serviceRefs = useRef({});
    const wrapperMenuRef = useRef(null);
    const isMobile = /Mobi|Android/i.test(navigator.userAgent);
    const yOffset = isMobile ? -150 : -150; // Подкорректированное смещение

    useEffect(() => {
        // Срабатывает при скроле страницы
        const handleScroll = () => {
            const blockTop = wrapperMenuRef.current.getBoundingClientRect().top;
            const headerHeight = document.querySelector(".header-wrapper .content").offsetHeight;

            setFixed(blockTop < headerHeight);

            const currentService = Object.keys(serviceRefs.current).find(key => {
                const service = serviceRefs.current[key];
                const rect = service.getBoundingClientRect();
                return rect.top <= 300 && rect.bottom >= 300;
            });

            if (updateActiveService && currentService && activeIndex !== menuData.findIndex(item => item.id === currentService)) {
                setActiveIndex(menuData.findIndex(item => item.id === currentService));
                scrollToSlide(menuData.findIndex(item => item.id === currentService));
                window.history.replaceState(null, null, `/#${currentService}`);
            } else if (updateActiveService && currentService === undefined) {
                setActiveIndex(null);
                scrollToSlide(null);
                window.history.replaceState(null, null, `/`);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {
        menuData.forEach((service) => {
            const element = document.getElementById(service.id);
            if (element) {
                serviceRefs.current[service.id] = element;
            }
        });

        const handleLoad = () => {
            const hashname = window.location.hash.split('/');
            const urlId = hashname[0] !== undefined && hashname[0] !== "" && hashname[0] !== null ? decodeURI(hashname[0]).slice(1) : "";

            let instant = false;
            if (hashname.length > 1) {
                let description = decodeURI(hashname[1]).toLowerCase();
                if (description === descriptionUrlName) instant = true;
            }

            if (urlId && menuData.some(item => item.id === urlId)) {
                const matchedItem = menuData.find(item => item.id === urlId);
                const index = menuData.findIndex(item => item.id === urlId);
                const element = document.getElementById(urlId);

                if (element) {
                    handleClick(matchedItem.id, index, instant)
                    if (instant) handleOpen(matchedItem);
                }
            }
        };

        let timedId;
        if (isMobile) {
            timedId = setTimeout(() => {
                handleLoad();
            }, 500);
        } else {
            if (document.readyState === "complete") {
                timedId = setTimeout(() => {
                    handleLoad();
                }, 500);
            } else {
                window.addEventListener('load', handleLoad);
            }
        }

        return () => {
            clearTimeout(timedId);
            window.removeEventListener('load', handleLoad);
        };
        // eslint-disable-next-line
    }, []);


    const scrollToSlide = (index) => {
        swiperRef.current?.swiper?.slideTo(index, 1000, false);
    };

    // Событие по горизонтальному меню категорий
    const handleClick = (id, index, instant) => {
        setUpdateActiveService(false);

        setActiveIndex(index);
        scrollToSlide(index);
        scrollToCService(id, false);
        window.history.replaceState(null, null, `/#${id}`);

        setTimeout(() => {
            setUpdateActiveService(true);
        }, 1000);
    };

    const scrollToCService = (id, instant) => {
        const element = document.getElementById(id);

        if (element) {
            scroll.scrollTo(element.offsetTop + yOffset, {
                duration: instant ? 0 : 1000,
                smooth: true
            });
        }
    };

    return (
        <div className='servicesmenu-wrapper' ref={wrapperMenuRef}>
            <div className={`fallback ${fixed ? 'fixed' : ''}`} style={{ height: '50px' }} />
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
                        {menuData.map((service, index) => (
                            <SwiperSlide className='item' key={service.id}>
                                <Link
                                    to={service.id} // Используем Link из react-scroll
                                    // smooth={true}
                                    onClick={() => handleClick(service.id, index, false)}
                                    className={`${activeIndex === index ? 'active-service' : ''}`}
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
};

export default ServicesMenu;
