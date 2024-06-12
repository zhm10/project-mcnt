import React from 'react';
import ServicesMenu from '../ServicesMenu/ServicesMenu';
import useIntersectionObserver from './useIntersectionObserver';
import './Services.css';
import detailingServices from "../../data/services.json";
const context = require.context('../../assets/services', true);

function Services() {
    const [containerRef, activeIndex, setActiveIndex] = useIntersectionObserver({
        root: null,
        rootMargin: '-110px 0px -99% 0px', // Проверяем пересечение только с верхней границей
        threshold: [0, 1],
    }, 'service-id');

    return (
        <div className='services-wrapper'>
            <ServicesMenu activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
            <div className='services' ref={containerRef}>
                {detailingServices.map((category, index) => (
                    <div key={category.id} className={`service-category service-id-${category.id} ${activeIndex === index ? 'active-service' : ''}`} service-id={category.id}>
                        <h1>{category.name}</h1>
                        <div className='content'>
                            {category.services.map(service => (
                                <div key={service.name} className='service' service-id={category.id}>
                                    <div className='content'>
                                        <img src={service.url ? context(`./Car1.jpeg`) : context(`./${service.url}`)} alt={service.name} />
                                        <h3>{service.name}</h3>
                                        <p>{service.description}</p>
                                        <p>Цена: ${service.price}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Services;
