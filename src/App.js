// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Stories from './components/Stories/Stories';
import Services from './components/Services/Services';
import MapsTabs from './components/Maps/MapsTabs';
import Footer from './components/Footer/Footer';
import ScrollToTopButton from './components/ScrollToTopButton/ScrollToTopButton';
import ContactInfo from './components/ContactInfo/ContactInfo';
import About from './components/Pages/About'; // Импортируем компонент About

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/about" element={
            <>
              <About />
              <ContactInfo />
              <MapsTabs />
            </>
          } />
          <Route path="/" element={
            <>
              {/* <Stories /> */}
              <Services />
              <ContactInfo />
              <MapsTabs />
            </>
          } />
        </Routes>
        <Footer />
        <ScrollToTopButton />
      </div>
    </Router >
  );
}

export default App;
