import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
// import Stories from './components/StoriesNew/Stories';
import Stories from './components/Stories/Stories';
import Services from './components/Services/Services';
import MapsTabs from './components/Maps/MapsTabs';
import Footer from './components/Footer/Footer'
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';

function App() {
  return (
    <Router>
        <div className="app">
          <Header />
          <Stories />
          <Services />
          <MapsTabs/>
          <Footer/>
          <ScrollToTopButton />
        </div>
    </Router>
  );
}

export default App;