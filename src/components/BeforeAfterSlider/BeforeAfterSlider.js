import React, { useEffect } from 'react';
import ReactBeforeSliderComponent from 'react-before-after-slider-component';
import 'react-before-after-slider-component/dist/build.css';
import './BeforeAfterSlider.css';

function BeforeAfterSlider({ firstImage, secondImage, onLoad }) {

    const delimiterIconStyles = {
        width: '40px',
        height: '40px',
        backgroundSize: 'cover',
        borderRadius: '0px',
        backgroundColor: 'rgb(255, 255, 255, 0)',
    };

    useEffect(() => {
        onLoad();
        // eslint-disable-next-line
    }, []);

    return (
        <ReactBeforeSliderComponent
            firstImage={{ imageUrl: firstImage, alt: 'До' }}
            secondImage={{ imageUrl: secondImage, alt: 'После'}}
            delimiterIconStyles={delimiterIconStyles}
        />
    );
}

export default BeforeAfterSlider;
