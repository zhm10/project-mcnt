import ServicesMenu from '../ServicesMenu/ServicesMenu';

import './Services.css';

import detailingServices from "../../data/services.json";

function Services() {
    return (
        <div className='services-wrapper'>
            <ServicesMenu />
            <div className='services'>
                {detailingServices.flatMap(category =>
                    category.services.map(service => (
                        <div key={service.name} className={'service service-id-' + category.id} >
                            <div className='content'>
                                <h3>{service.name}</h3>
                                <p>{service.description}</p>
                                <p>Цена: ${service.price}</p>
                                <img src={service.url} alt={service.name} />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Services;