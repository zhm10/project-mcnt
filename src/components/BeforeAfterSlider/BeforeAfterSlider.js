import { border } from '@mui/system';
import React from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import './BeforeAfterSlider.css';

function BeforeAfterSlider({ firstImage, secondImage }) {
    const delimiterIconStyles = {
        width: '9px',
        height: '60px',
        backgroundSize: 'cover',
        borderRadius: '0px',
        backgroundColor: 'rgb(255, 255, 255, 0)',
        // border: '1px solid white'
     }

    return (
        <ReactBeforeSliderComponent
            firstImage={{ imageUrl: firstImage }}
            secondImage={{ imageUrl: secondImage }}
            delimiterIconStyles={delimiterIconStyles}
            // delimiterColor="transparent"
            delimiterIcon={
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>&#8592;</span>
                    <div style={{ width: '5px', height: '20px', backgroundColor: 'gray' }}></div>
                    <span style={{ fontSize: '16px', fontWeight: 'bold' }}>&#8594;</span>
                </div>
            }
        />
    );
}

export default BeforeAfterSlider;
