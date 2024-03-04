import { useEffect, useContext, useState } from 'react';
import { UserContext } from '../hooks/useAuth';
import { useSearchParams, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Spinner from './Spinner';


const AuthRedirectHandler = ({ provider }) => {

  const { 
    userDetails,
    authenticate, 
    exchangeCodeForToken, 
    exchangeCodeForTokenGoogle, 
    exchangeCodeForTokenTwitter,
    exchangeCodeForTokenFacebook, 
    exchangeCodeForTokenLinkedIn,
  } = useContext(UserContext);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { agreementStatus } = useContext(UserContext);

  const [ error, setError ] = useState()

  useEffect(() => {
    // If userDetails are available, redirect to home page immediately
    if (userDetails) {
      navigate('/home');
    } else if (provider === 'github') {
      // Existing logic to handle GitHub authentication
      const code = searchParams.get('code');
      if (code) {
        exchangeCodeForToken(code).then(accessToken => {
          authenticate(provider, accessToken).then(() => {
            navigate('/home');
          });
        });
      }
    } else if (provider == "google") {
      const code = searchParams.get('code');
      console.log("accessToken", code)
      if (code) {
        exchangeCodeForTokenGoogle(code).then(accessToken => {
          authenticate(provider, accessToken, true).then(() => {
            navigate('/home');
          });
        });
      }
    } else if (provider == "facebook") {
      const code = searchParams.get('code');
      console.log("accessToken", code)
      if (code) {
        exchangeCodeForTokenFacebook(code).then(accessToken => {
          authenticate(provider, accessToken, true).then(() => {
            navigate('/home');
          });
        });
      }
    } else if (provider == "linkedin") {
      const code = searchParams.get('code');
      console.log("accessToken", code)
      if (code) {
        exchangeCodeForTokenLinkedIn(code).then(accessToken => {
          authenticate(provider, accessToken, true).then(() => {
            navigate('/home');
          });
        });
      }
    } else if (provider == "twitter") {
      const code = searchParams.get('code');
      console.log("accessToken", code)
      if (code) {
        exchangeCodeForTokenTwitter(code).then(accessToken => {
          authenticate(provider, accessToken, true).then(() => {
            navigate('/home');
          });
        });
      }
    }
  }, [
    authenticate, 
    exchangeCodeForToken, 
    provider, 
    searchParams, 
    navigate, 
    userDetails, 
    agreementStatus,
    exchangeCodeForTokenGoogle, 
    exchangeCodeForTokenTwitter,
    exchangeCodeForTokenFacebook, 
    exchangeCodeForTokenLinkedIn
  ]);

  return (
    <>
      <CssBaseline />
      <Container sx={{ py: 8 }} maxWidth="md"> 
        <Spinner text={'Authenticating...'} />
      </Container>
    </>
  );
};

export default AuthRedirectHandler;