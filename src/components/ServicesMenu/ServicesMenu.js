import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
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

        const initIntersectionObserver = () => {
            // function isMobileDevice() {
            //     return /Mobi|Android/i.test(navigator.userAgent);
            // }

            // Настройки обсервера для мобильных устройств
            const observerOptions = {
                root: null,
                rootMargin: `-100px 0px -${window.innerHeight - 101}px 0px`,
                threshold: [0],
            };

            // Настройки обсервера для ПК и планшетов
            // const desktopTabletObserverOptions = {
            //     root: null,
            //     rootMargin: '0px 0px -100% 0px',
            //     threshold: [0, 1],
            // };

            // const observerOptions = isMobileDevice() ? mobileObserverOptions : desktopTabletObserverOptions;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        // setActiveIndex(Number(index));
                        setActiveId(id)
                        window.history.replaceState(null, null, `/${id}`);
                        // scrollToSlide(index);
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
        addEventListeners();

        return () => {
            removeEventListeners();
            observer.disconnect();
        };
    }, [activeId, activeIndex]);

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
            const yOffset = -100; // Высота шапки
            const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            // alert(yCoordinate + " " + window.pageXOffset + " " + yOffset)
            window.scrollTo({ top: yCoordinate, behavior: 'instant' });
            window.history.pushState(null, null, `/${id}`);
        }
    }

    return (
        <div className='servicesmenu-wrapper' ref={wrapperMenuRef}>
            <div className={`fallback ${fixed ? 'fixed' : ''}`} style={{ height: '39px' }} />
            <div
                className={`servicesmenu ${fixed ? "fixed" : ""}`}
                style={{ top: fixed ? `${document.querySelector(".header-wrapper .content").offsetHeight}px` : '' }}
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
