import axios from 'axios';
import { logError } from './errorLoggingService';

// Function to fetch user details from the OAuth provider
export const fetchUserDetails = async (provider, accessToken, agreement_status) => {
  let userInfoUrl;

  // Determine the URL based on the provider
  switch (provider) {
    case 'github':
      userInfoUrl = 'https://api.github.com/user';
      break;
    // Add more cases for other providers
    case 'google':
      userInfoUrl = 'http://localhost:8000/google_auth/';
      break;
    case 'facebook':
      userInfoUrl = 'http://localhost:8000/facebook_auth/'
      break;
    case 'linkedin':
      userInfoUrl = 'http://localhost:8000/linkedin_auth/'
      break;
    
    case 'twitter':
      userInfoUrl = 'http://localhost:8000/twitter_auth/'
      break;

    default:
      throw new Error('Unsupported provider');
  }

  // Make an HTTP GET request to the provider's user info URL
  if (provider == "github") {
    const response = await axios.get(userInfoUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    // Return the user data
    return response.data;
    // if (provider == "google" || provider == "facebook" || provider == "linkedin")
  } else {
    const response = await axios.post(userInfoUrl, 
      {
        "auth_token": accessToken,
        "agreement_status": agreement_status,
        "role": localStorage.getItem('selectedRole')
      },
    );
    // Return the user data
    return response.data;
  }
  

  
};

// request for access token using code gotten from query param 
export const exchangeCodeForAccessToken = async (code) => {
  try {
    const response = await axios.post(import.meta.env.VITE_GITHUB_OAUTH, {
      client_id: import.meta.env.VITE_GITHUB_CLIENT_ID,
      client_secret: import.meta.env.VITE_GITHUB_CLIENT_SECRET,
      code: code,
      redirect_uri: import.meta.env.VITE_GITHUB_REDIRECT_URI
    });
    console.log("response", response)
    return response.data.access_token;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      logError(error.response.data.detail);
      throw error;
    } else {
      logError(error, 'Failed to exchange code for access token');
      throw error
    }
  }
};


// handles exchange code for token with google.
export const exchangeCodeForAccessTokenGoogle = async (code) => {
  try {
    // Construct the query parameters string
    const queryParams = new URLSearchParams({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
      code: code,
      redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
    }).toString();

    // Append the query parameters to the URL
    const url = `${import.meta.env.VITE_GOOGLE_OAUTH}?${queryParams}`;

    // Make a POST request with the URL that includes the query parameters
    const response = await axios.post(url);
    console.log("GoogleResponse", response);
    return response.data.id_token;

  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      logError(error.response.data.detail);
      throw error;
    } else {
      logError(error, 'Failed to exchange code for access token');
      throw error;
    }
  }
};


export const exchangeCodeForAccessTokenFacebook = async (code) => {
  try {
    const queryParams = new URLSearchParams({
      client_id: import.meta.env.VITE_FACEBOOK_CLIENT_ID,
      client_secret: import.meta.env.VITE_FACEBOOK_CLIENT_SECRET,
      code: code,
      redirect_uri: import.meta.env.VITE_FACEBOOK_REDIRECT_URI
    }).toString();
    
    const url = `${import.meta.env.VITE_FACEBOOK_OAUTH}?${queryParams}`;
    const response = await axios.get(url);
    console.log("response", response)
    return response.data.access_token;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      logError(error.response.data.detail);
      throw error;
    } else {
      logError(error, 'Failed to exchange code for access token');
      throw error
    }
  }
};

export const exchangeCodeForAccessTokenLinkedIn = async (code) => {
  try {
    const data = {
      // grant_type: "authorization_code",
      client_id: import.meta.env.VITE_LINKEDIN_CLIENT_ID,
      client_secret: import.meta.env.VITE_LINKEDIN_CLIENT_SECRET,
      code: code,
      redirect_uri: import.meta.env.VITE_LINKEDIN_REDIRECT_URI
    }
    
    const url = import.meta.env.VITE_LINKEDIN_OAUTH;
    const response = await axios.post(url, data);
    console.log("LinkedIn", response)
    return response.data.access_token;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      logError(error.response.data.detail);
      throw error;
    } else {
      logError(error, 'Failed to exchange code for access token');
      throw error
    }
  }
}

export const exchangeCodeForAccessTokenTwitter = async (code) => {
  try {
    const data = {
      // grant_type: "authorization_code",
      code: code,
      // code_verifier: "challenge",
      redirect_uri: import.meta.env.VITE_TWITTER_REDIRECT_URI
    }
    
    const url = import.meta.env.VITE_TWITTER_OAUTH;
    const response = await axios.post(url, data);
    console.log("Twitter", response)
    return response.data.access_token;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.detail) {
      logError(error.response.data.detail);
      throw error;
    } else {
      logError(error, 'Failed to exchange code for access token');
      throw error
    }
  }
}