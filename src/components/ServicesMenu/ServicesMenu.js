import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import useMediaQuery from '@mui/material/useMediaQuery';
import './ServicesMenu.css';
import 'swiper/css';
import 'swiper/css/free-mode';
import { FreeMode } from 'swiper/modules';
import menuData from "../../data/services.json";

const ServicesMenu = ({updateActiveCategory, setUpdateActiveCategory}) => {
    const [fixed, setFixed] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const [currentId, setCurrentId] = useState(null);
    const swiperRef = useRef(null);
    const sectionRefs = useRef({});
    const wrapperMenuRef = useRef(null);
    const isMobile = useMediaQuery('(max-width:600px)');

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: `-120px 0px -${window.innerHeight - 100}px 0px`,
            threshold: [0],
        };

        // Ищет совпадение на видимой области страницы категории которая таргетная сейчас
        const observer = new IntersectionObserver((entries) => {
            let found = false;
            // console.log(updateActiveCategory, currentId, activeId, window.location.hash.split('/'));

            entries.forEach((entry) => {
                const id = entry.target.getAttribute('id');
                
                if (!updateActiveCategory && currentId !== id) {
                    setActiveId(currentId);
                    setActiveIndex(menuData.findIndex(item => item.id === currentId));
                    window.history.replaceState(null, null, `/#${currentId}`);
                    found = true;
                } else if (entry.isIntersecting) {
                    setActiveId(id);
                    setActiveIndex(menuData.findIndex(item => item.id === id));
                    window.history.replaceState(null, null, `/#${id}`);
                    found = true;
                }
            });

            if (!found && activeId !== null) {
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
    }, [activeId, currentId, updateActiveCategory])

    useEffect(() => {
        // Срабатывает при скроле страницы
        const handleScroll = () => {
            const blockTop = wrapperMenuRef.current.getBoundingClientRect().top;
            const headerHeight = document.querySelector(".header-wrapper .content").offsetHeight;

            setFixed(blockTop < headerHeight);

            const currentSection = Object.keys(sectionRefs.current).find(key => {
                const section = sectionRefs.current[key];
                const rect = section.getBoundingClientRect();
                return rect.top <= 120 && rect.bottom >= 120;
            });

            if (updateActiveCategory && currentSection && activeIndex !== menuData.findIndex(item => item.id === currentSection)) {
                setActiveIndex(menuData.findIndex(item => item.id === currentSection));
                scrollToSlide(menuData.findIndex(item => item.id === currentSection));
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    });

    useEffect(() => {

        const handleLoad = () => {
            const hashname = window.location.hash.split('/');
            console.log(33);
            
            if (hashname.length < 2) return;
            const urlId = hashname[0] !== undefined && hashname[0] !== "" && hashname[0] !== null ? hashname[0].slice(1) : "";
            
            console.log("hashname", hashname);
            console.log("urlId", urlId);

            console.log(menuData);
            if (urlId && menuData.some(item => item.id === urlId)) {
                // console.log(100);
                //const category = menuData.find(item => item.id === urlId);
                const element = document.getElementById(urlId);
                // console.log("element", element);

                if (element) {
                    // console.log(101);
                    setUpdateActiveCategory(false);
                    scrollToCategory(urlId, true);

                    setTimeout(() => {
                        setUpdateActiveCategory(true);
                    }, 1000);
                }
            }
        }

        // Добавляем слушатель события загрузки страницы
        window.addEventListener('load', handleLoad);

        // Очищаем слушатель при размонтировании
        return () => {
            window.removeEventListener('load', handleLoad);
        };
    }, []);

    const scrollToSlide = (index) => {
        swiperRef.current?.swiper?.slideTo(index, 1000, false);
    };

    // Событие по горизонтальному меню категорий
    const handleClick = (id, index) => {
        setUpdateActiveCategory(false);

        setCurrentId(id);
        // setCurrentIndex(index);

        setActiveIndex(index);
        scrollToSlide(index);
        scrollToCategory(id, false);

        setTimeout(() => {
            setUpdateActiveCategory(true);
        }, 1000);
    };

    const scrollToCategory = (id, instant) => {
        const element = document.getElementById(id);

        if (element) {
            const yOffset = isMobile ? -100 : -80;
            const yCoordinate = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: yCoordinate, behavior: instant ? 'instant': 'smooth' });
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
                            <SwiperSlide className='item' key={service.id}>
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
