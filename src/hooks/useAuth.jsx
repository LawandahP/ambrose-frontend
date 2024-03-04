import { createContext, useState } from 'react';
import { 
  fetchUserDetails,
  exchangeCodeForAccessToken, 
  exchangeCodeForAccessTokenGoogle, 
  exchangeCodeForAccessTokenFacebook, 
  exchangeCodeForAccessTokenLinkedIn, 
  exchangeCodeForAccessTokenTwitter
} from '../services/authService';
import { logError } from '../services/errorLoggingService';

export const UserContext = createContext(null);

export const UserAuth = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem('userDetails');
    return savedUserDetails ? JSON.parse(savedUserDetails) : null;
  });

  const [agreementStatus, setAgreementStatus] = useState(false); // Track agreement status

  // Function to update agreement status
  const updateAgreementStatus = (status) => {
    setAgreementStatus(status);
  };

  const authenticate = async (provider, accessToken, agreement_status) => {

    if (
      provider == 'github' || provider == "google" || 
      provider == "facebook" || provider == "linkedin" ||
      provider == "twitter"
    ) {
      try {
        const userDetails = await fetchUserDetails(provider, accessToken, agreement_status);
        console.log("userDetails", userDetails);
        
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        setUserDetails(userDetails);
      } catch (error) {
        logError(error, 'Authentication failed');
        throw error;
      }
    } 

  };

  const exchangeCodeForToken = async (code) => {
    try {
      const accessToken = await exchangeCodeForAccessToken(code);
      return accessToken;
    } catch (error) {
      logError(error, 'Github code exchange for access token failed');
      throw error;
    }
  };

  const exchangeCodeForTokenGoogle = async (code) => {
    try {
      const accessToken = await exchangeCodeForAccessTokenGoogle(code);
      return accessToken;
    } catch (error) {
      logError(error, 'Google code exchange for access token failed');
      throw error;
    }
  };

  
  const exchangeCodeForTokenFacebook = async (code) => {
    try {
      const accessToken = await exchangeCodeForAccessTokenFacebook(code);
      return accessToken;
    } catch (error) {
      logError(error, 'Facebook code exchange for access token failed');
      throw error;
    }
  };

  const exchangeCodeForTokenLinkedIn = async (code) => {
    try {
      const accessToken = await exchangeCodeForAccessTokenLinkedIn(code);
      return accessToken;
    } catch (error) {
      logError(error, 'LinkedIn code exchange for access token failed');
      throw error;
    }
  };

  const exchangeCodeForTokenTwitter = async (code) => {
    try {
      const accessToken = await exchangeCodeForAccessTokenTwitter(code);
      return accessToken;
    } catch (error) {
      logError(error, 'Twitter code exchange for access token failed');
      throw error;
    }
  };

  

  const logout = () => {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('selectedRole')
    setUserDetails(null);
  };

  const contextValue = {
    userDetails,
    authenticate,
    exchangeCodeForToken,
    exchangeCodeForTokenGoogle,
    exchangeCodeForTokenTwitter,
    exchangeCodeForTokenFacebook,
    exchangeCodeForTokenLinkedIn,
    agreementStatus,
    updateAgreementStatus,
    logout
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};