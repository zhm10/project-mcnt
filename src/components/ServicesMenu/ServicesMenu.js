import { Swiper, SwiperSlide } from 'swiper/react';

import './ServicesMenu.css';
import 'swiper/css';
import 'swiper/css/free-mode';

import menuData from "../../data/services.json";
import { FreeMode, Pagination } from 'swiper/modules';


function ServicesMenu() {
    return (
        <div className='servicesmenu-container'>
            <Swiper
                slidesPerView={"auto"}
                freeMode={true}
                // spaceBetween={30}
                // pagination={{
                // clickable: true,
                // }}
                modules={[FreeMode, Pagination]}
                className='content'
            >

            {menuData.map(service => (
                <SwiperSlide key={service.id} className='item'>{service.name}</SwiperSlide>
            ))}
            </Swiper>
        </div>
    );
}

export default ServicesMenu;