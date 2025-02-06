/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [authenticating, setAuthenticating] = useState(false);
  const navigate = useNavigate();

  const [successSignUp, setSuccessSignUp] = useState(false);
  const [signUpData, setSignUpData] = useState(false);
  const [successVerification, setSuccessVerification] = useState(false);
  const [successOtpGeneration, setSuccessOtpGeneration] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  

  const googleLogin = async (credential) => {
    setAuthenticating(true);
    // const { showToast } = useToastStore.getState();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/auth/google/?action=login`,
        credential
      );
      const token = response.data?.token?.access;
      const userDetails = response.data?.user;
      localStorage.setItem("authToken", token);
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      setIsAuthenticated(true);
      setAuthenticating(false);
      navigate("/home");
    } catch (error) {
      setAuthenticating(false);
    //   showToast(error.response ? error.response.data.detail : "Google login failed!", "error");
    }
  };


  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const handleStorageChange = () => {
      if (!localStorage.getItem("authToken")) {
        setIsAuthenticated(false);
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [navigate]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        successSignUp,
        signUpData,
        googleLogin,
        logout,
        error,
        authenticating,
        successOtpGeneration,
        successVerification,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};