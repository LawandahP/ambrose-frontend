/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../hooks/useAuth';


export const RequireAuthentication = (WrappedComponent) => {
    const AuthenticatedComponent = (props) => {
      const { userDetails } = useContext(UserContext);
      const navigate = useNavigate()
  
      useEffect(() => {
        if (!userDetails) {
            navigate('/');
        }
      }, [navigate, userDetails])
  
      return <WrappedComponent {...props} />
    }
  
    return AuthenticatedComponent
}
