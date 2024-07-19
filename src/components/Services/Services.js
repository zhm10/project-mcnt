import React from 'react';
import ServicesMenu from '../ServicesMenu/ServicesMenu';
import './Services.css';
import detailingServices from "../../data/services.json";
import defaultImg from "../../assets/services/Car1.jpeg";
const context = require.context('../../assets/services', true);

function Services() {
    // Попытаться загрузить изображение из контекста
    const loadImage = (imageName) => {
        try {
            return context(`./${imageName}`, false, /\.(jpeg|jpg|png)$/);
        } catch {
            return defaultImg; // Если изображение не найдено, вернуть изображение по умолчанию
        }
    };

    return (
        <div className='services-wrapper'>
            <ServicesMenu />
            <div className='services'>
                {detailingServices.map((category, category_index) => (
                    <div
                        key={category_index}
                        id={`${category.id}`}
                        className={`service-category`}
                        data-index={category_index}
                    >
                        <h1>{category.name}</h1>
                        <div className='content'>
                            {category.services.map((service, service_index) => (
                                <div key={service_index} className='service'>
                                    <div className='content'>
                                        <img src={loadImage(service.img)} alt={service.name} />
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
