// MenuIconCustom.js
import React from 'react';
import './MenuIconCustom.css';

const MenuIconCustom = ({ open }) => {
  return (
    <div className={`menu-icon-container ${open ? 'open' : ''}`}>
      <div className="menu-icon-bar"></div>
      <div className="menu-icon-bar"></div>
    </div>
  );
};

export default MenuIconCustom;
