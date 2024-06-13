import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Stories from './components/Stories/Stories';
import Services from './components/Services/Services';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Stories />
        <Services />
        <div className="products">
          <span>Что-то еще будет</span>
        </div>
      </div>
    </Router>
  );
}

export default App;
