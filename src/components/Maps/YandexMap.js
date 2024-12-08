import React from 'react';
import { YMaps, Map, Placemark, ZoomControl } from '@pbe/react-yandex-maps';
import './YandexMap.css'

const YandexMap = () => {

    const mapState = {
        center: [57.903345, 59.964988], // Центр карты
        zoom: 12,
        controls: [], // Убираем стандартные контролы
        behaviors: [], // отключение событийй устройством ввода
    };

    const mapOptions = {
        suppressMapOpenBlock: false, // Убираем всплывающее окно "Открыть в Яндекс.Картах"
    };

    const placemarks = [
        { coordinates: [57.873615, 59.958835], hint: 'Уральский просп., 71, Нижний Тагил', balloon: 'Детейлинг<br>Уральский просп., 71,<br>г.Нижний Тагил' },
        { coordinates: [57.911856, 59.959625], hint: 'Красноармейская ул., 62А, Нижний Тагил', balloon: 'Детейлинг<br>Красноармейская ул., 62А,<br>г.Нижний Тагил' },
    ];

    return (
        <div style={{position: 'relative'}}>
            <div className='wrapper-yandex-map-shape'></div>
            <div>
                <YMaps query={{ lang: 'ru_RU', load: 'package.full' }}>
                    <Map
                        defaultState={{
                            ...mapState,
                            type: 'yandex#map'
                        }}
                        options={mapOptions}
                        width="100%"
                        height="500px"
                        modules={['geoObject.addon.balloon', 'geoObject.addon.hint']}
                    >
                        {placemarks.map((mark, index) => (
                            <Placemark
                                key={index}
                                geometry={mark.coordinates}
                                properties={{
                                    hintContent: mark.hint,
                                    balloonContent: mark.balloon,
                                }}
                            />
                        ))}
                        <ZoomControl options={{ float: 'left' }} />
                    </Map>
                </YMaps>
            </div>
        </div>
    );
};

export default YandexMap;
