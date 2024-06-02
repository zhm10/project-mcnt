import React from 'react';
import './Header.css'; // Импортируем файл со стилями
import headerLogo from "../../assets/HeaderLogo.jpeg?url"

function Header() {
  return (
    <div className="header-container">
      <div className="fallback"></div>
      <div className="content">
        <img src={headerLogo} alt=""/>
      </div>
    </div>
  );
}

export default Header;
