
import React from 'react';
import { githubConfig, googleConfig } from '../services/oauthConfig';
import LoginButton from './LoginButton';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';


// Function to handle login button click
export const handleLogin = (providerConfig, provider) => {
    // Construct the OAuth URL
    if (provider == "twitter") {
      const authUrl = `${providerConfig.authorizationUrl}?response_type=code&client_id=${providerConfig.clientId}&redirect_uri=${providerConfig.redirectUri}&state=${providerConfig.state}&scope=${encodeURIComponent(providerConfig.scope)}&code_challenge=${providerConfig?.code_challenge}&code_challenge_method=${providerConfig?.code_challenge_method}`;
      // Redirect to the OAuth provider's login page
      window.location.href = authUrl;
    } else if(provider == "linkedin") {
      const authUrl = `${providerConfig.authorizationUrl}?response_type=code&client_id=${providerConfig.clientId}&redirect_uri=${providerConfig.redirectUri}&state=${providerConfig.state}&scope=${encodeURIComponent(providerConfig.scope)}`;
      // Redirect to the OAuth provider's login page
      window.location.href = authUrl;
    } else {
      const authUrl = `${providerConfig.authorizationUrl}?response_type=code&client_id=${providerConfig.clientId}&redirect_uri=${providerConfig.redirectUri}&scope=${encodeURIComponent(providerConfig.scope)}`;
      // Redirect to the OAuth provider's login page
      window.location.href = authUrl;
    }
    
};

// Component for the login page
const Login = () => {
  
  return (
    <div className='login-button-container'>
      {/* Add more buttons for other providers */}
      
      <LoginButton 
        text={'Continue with Google'}
        icon={<FcGoogle size={24} />}
        onClick={() => handleLogin(googleConfig)
      }/>

      {/* <LoginButton 
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






