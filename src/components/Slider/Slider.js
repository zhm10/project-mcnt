import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import './Slider.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import slides from "../../data/slides.json";
import Skeleton from '@mui/material/Skeleton';
import Box from '@mui/material/Box';

const context = require.context('../../assets/slider', true, /\.(mp4)$/);

const Slider = () => {
  const [loading, setLoading] = useState(true);

  // Определяем тип устройства (мобильное или десктоп)
  const isMobile = /Mobi|Android/i.test(navigator.userAgent);

  // Функция для получения пути к нужному медиафайлу
  const getMediaPath = (slide) => {
    const media = isMobile ? slide.mobile : slide.desktop;
    const mediaPath = context(`./${media.name}`);
    const text = isMobile ? slide.mobile.text : slide.desktop.text;
    return { path: mediaPath, alt: media.alt || '', text: text || '' };
  };

  return (
    <Box className="slider-wrapper" style={{ position: 'relative' }}>
      {loading && (
        <Skeleton
          variant="rectangular"
          width="100%"
          height="100vh"
          animation="wave"
          style={{ position: 'absolute', top: 0, left: 0, zIndex: 10 }}
        />
      )}
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        pagination={{
          el: '.swiper-pagination',
          type: 'fraction',
        }}
        modules={[Navigation, Pagination]}
        loop
        onSwiper={() => setLoading(false)}
        preloadImages={false}
      >
        {slides.map((slide, index) => {
          const { path, alt, text } = getMediaPath(slide);
          return (
            <SwiperSlide key={slide.id}>
              <Box style={{ position: 'relative', width: '100%', height: '100vh' }}>
                {index === 0 ? (
                  <video
                    src={path}
                    alt={alt}
                    autoPlay
                    loop
                    muted
                    onCanPlayThrough={() => setLoading(false)}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <video
                    src={path}
                    alt={alt}
                    autoPlay
                    loop
                    muted
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    loading="lazy"
                  />
                )}
                {text && (
                  <Box className="slider-content-text">
                    {text}
                  </Box>
                )}
              </Box>
            </SwiperSlide>
          );
        })}
        
        {/* Блок навигации и пагинации */}
        <Box className="slider-controls">
          <div className="swiper-pagination" />
          <Box className="slider-controls-arrows">
            <div className="swiper-button-prev" />
            <div className="swiper-button-next" />
          </Box>
        </Box>
      </Swiper>
    </Box>
  );
};

export default Slider;
