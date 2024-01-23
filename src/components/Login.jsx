/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
import React from 'react';
import { googleConfig, facebookConfig, githubConfig } from '../services/oauthConfig';
import LoginButton from './LoginButton';
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaGithub } from 'react-icons/fa';

// Function to handle login button click
export const handleLogin = (providerConfig) => {
    // Construct the OAuth URL
    const authUrl = `${providerConfig.authorizationUrl}?response_type=token&client_id=${providerConfig.clientId}&redirect_uri=${providerConfig.redirectUri}&scope=${encodeURIComponent(providerConfig.scope)}`;
    // Redirect to the OAuth provider's login page
    window.location.href = authUrl;
};

// Component for the login page
const Login = () => {
  
  return (
    <div className='login-button-container'>
      {/* Add more buttons for other providers */}
      {/* <LoginButton 
        text={'Continue with Google'}
        icon={<FcGoogle size={24} />}
        onClick={() => handleLogin(googleConfig)
      }/>

      <LoginButton 
        text={'Continue with Facebook'}
        icon={<FaFacebook size={24} />}
        onClick={() => handleLogin(facebookConfig)
      }/>    */}

      <LoginButton 
        text={'Continue with Github'}
        icon={<FaGithub size={24} />}
        onClick={() => handleLogin(githubConfig)
      }/> 
        
    </div>
  );
};

export default Login;

