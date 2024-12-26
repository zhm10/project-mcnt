import React, { useState } from 'react';
import { Tabs, Tab, Box, Container } from '@mui/material';
import "./MapsTabs.css";
import TwoGisMap from '../TwoGis/Map/TwoGisMap';
import YandexMap from '../Yandex/Map/YandexMap';
import YandexMapReviews from '../Yandex/Reviews/YandexMapReviews';

const center = [57.888935, 59.976723];
const zoom = 12;

const MapTabs = () => {
  const [value, setValue] = useState(0); // Индекс активной вкладки

  const handleChange = (event, newValue) => {
    if (typeof newValue === 'number') {
      setValue(newValue);
    }
  };

  return (
    <Container className='map-tabs-wrapper' maxWidth='xl' style={{ padding: '50px 0 0 0' }} disableGutters>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="map tabs"
        className='maps-tabs-buttons'
        centered
      >
        <Tab label="Яндекс Карта" />
        <Tab label="2GIS Карта" />
      </Tabs>
      <Box style={{ width: '100%', padding: '20px 0 0 0' }}>
        {value === 0 && (
          <>
            <YandexMap />
            <YandexMapReviews />
          </>
        )}
        {value === 1 && (
          <TwoGisMap center={center} zoom={zoom} />
        )}
      </Box>
    </Container>
  );
};

export default MapTabs;
