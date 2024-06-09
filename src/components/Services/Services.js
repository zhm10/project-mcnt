import ServicesMenu from '../ServicesMenu/ServicesMenu';

import './Services.css';

import detailingServices from "../../data/services.json";
const context = require.context('../../assets/services', true);

function Services() {
    return (
        <div className='services-wrapper'>
            <ServicesMenu />
            <div className='services'>
                {detailingServices.flatMap(category => (
                    <div className={'service-category service-id-' + category.id}>
                        <h1>{category.name}</h1>
                        <div className='content'>
                            {category.services.map(service => (
                                <div key={service.name} className={'service service-id-' + category.id} >
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
                )
                )}
            </div>
        </div>
    );
}

export default Services;