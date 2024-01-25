import { createContext, useState } from 'react';
import { exchangeCodeForAccessToken, fetchUserDetails } from '../services/authService';
import { logError } from '../services/errorLoggingService';

export const UserContext = createContext(null);

export const UserAuth = ({ children }) => {
  const [userDetails, setUserDetails] = useState(() => {
    const savedUserDetails = localStorage.getItem('userDetails');
    return savedUserDetails ? JSON.parse(savedUserDetails) : null;
  });

  const authenticate = async (provider, accessToken) => {
    try {
      const userDetails = await fetchUserDetails(provider, accessToken);
      console.log("userDetails", userDetails);
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      setUserDetails(userDetails);
    } catch (error) {
      logError(error, 'Authentication failed');
      throw error;
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

  const logout = () => {
    localStorage.removeItem('userDetails');
    setUserDetails(null);
  };

  const contextValue = {
    userDetails,
    authenticate,
    exchangeCodeForToken,
    logout
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};