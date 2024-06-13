import React, { useRef, useEffect} from 'react';
import ServicesMenu from '../ServicesMenu/ServicesMenu';
import './Services.css';
import detailingServices from "../../data/services.json";
const context = require.context('../../assets/services', true);

function Services() {
    const sectionRefs = useRef({});

    useEffect(() => {
        detailingServices.forEach(service => {
          sectionRefs.current[service.id] = document.getElementById(`service-${service.id}`);
        });
      }, []);

    return (
        <div className='services-wrapper'>
            <ServicesMenu />
            <div className='services'>
                {detailingServices.map((category, index) => (
                    <div
                        key={category.id}
                        id={`service-${category.id}`}
                        className={`service-category service-id-${category.id}`}
                        service-id={category.id}
                        ref={el => sectionRefs.current[category.id] = el}
                    >
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
