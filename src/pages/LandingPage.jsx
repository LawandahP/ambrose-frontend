import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { facebookConfig, githubConfig, googleConfig, linkedinConfig, twitterConfig } from '../services/oauthConfig';
import LoginButton from '../components/LoginButton';
import { FaFacebook, FaGithub, FaTwitter } from 'react-icons/fa';
import { handleLogin } from '../components/Login';
import { UserContext } from '../hooks/useAuth';
import { FcGoogle } from 'react-icons/fc';
import AgreementButton from '../components/check';
import axios from 'axios'; 
import { FaLinkedin } from 'react-icons/fa6';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        Album
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


export default function LandingPage() {
  const { userDetails, agreementStatus } = React.useContext(UserContext);

  // const handleLinkedInLogin = async () => {  
  //   try {
  //     const response = await axios.post(import.meta.env.VITE_LINKEDIN_OAUTH, {
  //       headers: {
  //         'Content-Type': 'application/x-www-form-urlencoded'
  //       }
  //     },
  //     {
  //         "grant_type": "client_credentials",
  //         "client_id": import.meta.env.VITE_LINKEDIN_CLIENT_ID,
  //         "client_secret": import.meta.env.VITE_LINKEDIN_CLIENT_SECRET
  //     }
  //     );
  
  //     if (response?.data?.access_token) {
  //       // Redirect with access_token in query params
  //       window.location.href = `http://localhost:5173/auth/linkedin?access_token=${response?.data?.access_token}`;
  //     }
  //   } catch (error) {
  //     console.error('LinkedIn login error:', error);
  //   }
  // };
  

  return (
      <>
       <CssBaseline />
        <Container sx={{ py: 8 }} maxWidth="md">    
          <main>
            <Box
              sx={{
                bgcolor: 'background.paper',
                pt: 8,
                pb: 6,
              }}
            >
              <Container maxWidth="sm">
                <Typography
                  component="h1"
                  variant="h2"
                  align="center"
                  color="text.primary"
                  gutterBottom
                >
                  Album
                </Typography>
                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                  Discover a new way to organize and store your memories. 
                  Our app simplifies managing your photo albums, 
                  allowing you to curate your moments and share
                  them with friends and family with ease.
                </Typography>
                <Stack
                  sx={{ pt: 4 }}
                  direction="row"
                  spacing={2}
                  justifyContent="center"
                >
                  {!userDetails && 
                  <div>
                      <div style={{display: "flex", gap: "10px"}}>
                        {/* <LoginButton 
                          text={'Login with Github'}
                          icon={<FaGithub size={24} />}
                          onClick={() => handleLogin(githubConfig)
                        }/>  */}

                        <LoginButton 
                          disabled={!agreementStatus}
                          text={'Login with Google'}
                          icon={<FcGoogle size={24} />}
                          onClick={() => handleLogin(googleConfig)}
                        /> 

                        <LoginButton 
                          disabled={!agreementStatus}
                          text={'Login with Facebook'}
                          icon={<FaFacebook size={24} />}
                          onClick={() => handleLogin(facebookConfig)}
                        /> 

                        <LoginButton 
                          disabled={!agreementStatus}
                          text={'Login with Twitter'}
                          icon={<FaTwitter size={24} />}
                          onClick={() => handleLogin(twitterConfig, "twitter")}
                        /> 

                        <LoginButton 
                          disabled={!agreementStatus}
                          text={'Login with LinkedIn'}
                          icon={<FaLinkedin size={24} />}
                          onClick={() => handleLogin(linkedinConfig, "linkedin")}
                        /> 

                      </div>
                      <AgreementButton />
                  </div>
                  }
                </Stack>
              </Container>
            </Box>
            
          </main>
        </Container>

        {/* Footer */}
        <Box sx={{ bgcolor: 'background.paper', p: 6, bottom: 0 }} component="footer">
          <Copyright />
        </Box>
      {/* End footer */}
      </>
    
  );
}