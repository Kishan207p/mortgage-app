import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SideBar from './components/SideBar';
import CalculatorPage from './pages/CalculatorPage';
import DocumentPage from './pages/DocumentPage';
import ComparisonPage from './pages/ComparisonPage';
import HomePage from './pages/HomePage'
import './App.css'
import ContactUsPage from './pages/ContactUsPage';
import AboutUsPage from './pages/AboutUsPage'

const App = () => {
  return (
    <Router>
      <div className="flex h-screen">
        <SideBar />
        <div className="flex-grow p-4 ml-40">
          <Routes>
          <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomePage />} />
            <Route path="/calculator" element={<CalculatorPage />} />
            <Route path="/document" element={<DocumentPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
            <Route path="/contactus" element={<ContactUsPage />} />
            <Route path="/aboutus" element={<AboutUsPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;