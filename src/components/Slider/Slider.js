import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules'; // Убрали Autoplay
import 'swiper/css';
import 'swiper/css/navigation';

const Slider = () => {
  const slides = [
    { id: 1, image: 'https://via.placeholder.com/800x400?text=Test+1', alt: 'Slide 1' },
    { id: 2, image: 'https://via.placeholder.com/800x400?text=Test+2', alt: 'Slide 2' },
    { id: 3, image: 'https://via.placeholder.com/800x400?text=Test+3', alt: 'Slide 3' },
  ];

  return (
    <Swiper
      modules={[Navigation]}
      spaceBetween={0}
      slidesPerView={1}
      navigation
      loop
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <img
            src={slide.image}
            alt={slide.alt}
            style={{ width: '100%', height: '100vh', objectFit: 'cover'}}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
