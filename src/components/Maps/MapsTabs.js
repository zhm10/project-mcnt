import React, { useState } from 'react';
import { Tabs, Tab, Box, Container } from '@mui/material';
import "./MapsTabs.css";
import TwoGisMap from './TwoGisMap';
import YandexMap from './YandexMap';

const center = [57.888935, 59.976723];
const zoom = 12;

const MapTabs = () => {
  const [value, setValue] = useState(0); // Индекс активной вкладки

  const handleChange = (event, newValue) => {
    // Проверяем, что newValue является числом
    if (typeof newValue === 'number') {
      setValue(newValue);
    } else {
      console.warn("Invalid value passed to handleChange:", newValue);
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
      <Box style={{ width: '100%', height: '500px', padding: '20px 0 0 0' }}>
        {value === 0 && (
          <YandexMap />
        )}
        {value === 1 && (
          <TwoGisMap center={center} zoom={zoom} />
        )}
      </Box>
    </Container>
  );
};

export default MapTabs;
