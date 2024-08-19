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
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const swiperRef = useRef(null);
    const sectionRefs = useRef({});
    const wrapperMenuRef = useRef(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        // Initialize Intersection Observer
        const observerOptions = {
            root: null,
            rootMargin: `-120px 0px -${window.innerHeight - 100}px 0px`,
            threshold: [0],
        };

        const observer = new IntersectionObserver((entries) => {
            let found = false;
            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id');
                if (entry.isIntersecting) {
                    setActiveId(id);
                    setActiveIndex(menuData.findIndex(item => item.id === id));
                    window.history.replaceState(null, null, `/${id}`);
                    found = true;
                }
            });

            if (!found && activeId !== null) {
                // Reset URL to default if no category is in view
                setActiveId(null);
                setActiveIndex(null);
                window.history.replaceState(null, null, '/');
            }
        }, observerOptions);

        menuData.forEach((service) => {
            const element = document.getElementById(service.id);
            if (element) {
                observer.observe(element);
                sectionRefs.current[service.id] = element;
            }
        });

        return () => observer.disconnect();
    }, [activeId]);

    useEffect(() => {
        const handleScroll = () => {
            const blockTop = wrapperMenuRef.current.getBoundingClientRect().top;
            const headerHeight = document.querySelector(".header-wrapper .content").offsetHeight;

            setFixed(blockTop < headerHeight);

            const currentSection = Object.keys(sectionRefs.current).find(key => {
                const section = sectionRefs.current[key];
                const rect = section.getBoundingClientRect();
                return rect.top <= 120 && rect.bottom >= 120;
            });

            if (currentSection && activeIndex !== menuData.findIndex(item => item.id === currentSection)) {
                setActiveIndex(menuData.findIndex(item => item.id === currentSection));
                scrollToSlide(menuData.findIndex(item => item.id === currentSection));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeIndex]);

    useEffect(() => {
        const pathname = window.location.pathname.slice(1);
        if (pathname && menuData.find(item => item.id === pathname)) {
            const element = document.getElementById(pathname);
            if (element) {
                setTimeout(() => scrollToCategory(pathname), 100);
            }
        }
    }, []);

    const scrollToSlide = (index) => {
        swiperRef.current?.swiper?.slideTo(index, 1000, false);
    };

    const handleClick = (id, index) => {
        setActiveIndex(index);
        scrollToSlide(index);
        scrollToCategory(id);
    };

    const scrollToCategory = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const yOffset = isMobile ? -100 : -80;
            const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: yCoordinate, behavior: 'instant' });
            window.history.pushState(null, null, `/${id}`);
        }
    };

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
                        {menuData.map((service, index) => (
                            <SwiperSlide className={`item`} key={service.id}>
                                <a
                                    href={`/${service.id}`}
                                    className={`${activeIndex === index ? 'active-service' : ''}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleClick(service.id, index);
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
