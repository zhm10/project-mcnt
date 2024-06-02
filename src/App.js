// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Stories from './components/Stories/Stories';

function App() {
  return (
    <div className="app">
      <Header/>
      <Stories/>
      <nav className="menu">
        {/* Здесь будет ваше горизонтальное меню */}
        <ul>
          {/* <li><a href="#fruits">Фрукты</a></li>
          <li><a href="#berries">Ягоды</a></li>
          <li><a href="#milk">Молоко</a></li> */}
          {/* Другие категории */}
        </ul>
      </nav>
      <div className="products">
        <span>Что-то еще будет</span>
      </div>
    </div>
  );
}

export default App;
