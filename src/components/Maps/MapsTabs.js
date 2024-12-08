import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Box, Container } from '@mui/material';
import TwoGisMap from './TwoGisMap';
import YandexMap from './YandexMap';

const center = [57.888935, 59.976723];
const zoom = 12;

const MapTabs = () => {
  const [value, setValue] = useState(0); // Индекс активной вкладки

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Эффект для инициализации карты при смене вкладок
  useEffect(() => {
  }, [value]);

  return (
    <Container maxWidth='xl' style={{ margin: '50px 0 0 0' }} disableGutters>
      <Tabs value={value} onChange={handleChange} aria-label="map tabs" className='maps-tabs' centered>
        <Tab label="Яндекс Карта" />
        <Tab label="2GIS Карта" />
      </Tabs>
      <Box style={{ width: '100%', height: '500px', margin: '20px 0 0 0' }}>
        {value === 0 && <div >
          {
            // eslint-disable-next-line jsx-a11y/iframe-has-title
            // <iframe
            //   src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac2d85a94a1c6419463c5f7162ce4798434c9f93e64d3b379b3c4a4a318f46c4b&amp;source=constructor" 
            //   style={{
            //     border: 'none',
            //     width: '100%',
            //     height: '500px'
            //   }}
            // ></iframe>
            <YandexMap />
          }
        </div>}
        {value === 1 && <div id="two-gis-map">
          <TwoGisMap
            center={center}
            zoom={zoom}
          />
        </div>}
      </Box>
    </Container>
  );
};

export default MapTabs;
