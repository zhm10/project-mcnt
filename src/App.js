// import logo from './logo.svg';
import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import Stories from './components/Stories/Stories';
import Services from './components/Services/Services';

function App() {
  return (
    <div className="app">
      <Header/>
      <Stories/>
      <Services/>
      <div className="products">
        <span>Что-то еще будет</span>
      </div>
    </div>
  );
}

export default App;
