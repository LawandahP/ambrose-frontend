/* eslint-disable no-unused-vars */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthRedirectHandler from './components/AuthRedirectHandler';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import PhotoDetails from './pages/Photo';
import AlbumPage from './pages/Album';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth/google" element={<AuthRedirectHandler provider="google" />} />
        <Route path="/auth/facebook" element={<AuthRedirectHandler provider="facebook" />} />
        <Route path="/auth/github" element={<AuthRedirectHandler provider="github" />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/user/:id" element={<UserPage />} />
        <Route path="/album/:id" element={<AlbumPage />} />
        <Route path="/photo/:id" element={<PhotoDetails />} />
        {/* Add more routes for other providers */}
      </Routes>
    </Router>
  );
};

export default Routing;