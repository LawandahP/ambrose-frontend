import { createContext, useState } from 'react';
import { exchangeCodeForAccessToken, fetchUserDetails } from '../services/authService';

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
      console.error('Authentication failed:', error);
    }
  };

  const exchangeCodeForToken = async (code) => {
    try {
      const accessToken = await exchangeCodeForAccessToken(code);
      return accessToken;
    } catch (error) {
      console.error('GitHub code exchange failed:', error);
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