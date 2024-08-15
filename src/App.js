import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Stories from './components/Stories/Stories';
import Services from './components/Services/Services';
import MapsTabs from './components/Maps/MapsTabs';
import Footer from './components/Footer/Footer'

function App() {
  return (
    <Router>
        <div className="app">
          <Header />
          <Stories />
          <Services />
          <MapsTabs/>
          <Footer/>
        </div>
    </Router>
  );
}

export default App;