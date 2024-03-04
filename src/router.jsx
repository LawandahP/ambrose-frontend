import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AuthRedirectHandler from './components/AuthRedirectHandler';
import HomePage from './pages/Home';
import UserPage from './pages/User';
import PhotoDetails from './pages/Photo';
import AlbumPage from './pages/Album';
import App from './App.jsx'


const Router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      index: 'true',
      element: <LandingPage />,
    },
    {
      path: '/home',
      element: <HomePage />,
    },
    {
      path: '/user/:id',
      element: <UserPage />,
    },
    {
      path: '/album/:id',
      element: <AlbumPage />,
    },
    {
      path: '/photo/:id',
      element: <PhotoDetails />,
    },
    {
      path: '/auth/github',
      element: <AuthRedirectHandler provider="github" />,
    },
    {
      path: '/auth/google',
      element: <AuthRedirectHandler provider="google" />,
    },
    {
      path: '/auth/facebook',
      element: <AuthRedirectHandler provider="facebook" />,
    },
    {
      path: '/auth/twitter',
      element: <AuthRedirectHandler provider="twitter" />,
    },
    {
      path: '/auth/linkedin',
      element: <AuthRedirectHandler provider="linkedin" />,
    },
  ]
}])

export default Router;