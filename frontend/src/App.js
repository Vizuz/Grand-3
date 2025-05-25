import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';
import HomePage from './pages/HomePage';
import ApartmentsPage from './pages/ApartmentsPage';
import ApartmentDetailPage from './pages/ApartmentDetailPage';
import AboutPage from './pages/AboutPage';
import ContactsPage from './pages/ContactsPage';
import AdminPage from './pages/AdminPage';
import './App.css';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/apartments" element={<ApartmentsPage />} />
            <Route path="/apartments/:id" element={<ApartmentDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contacts" element={<ContactsPage />} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;