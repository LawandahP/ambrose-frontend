/* eslint-disable no-unused-vars */
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { githubConfig } from '../services/oauthConfig';
import LoginButton from '../components/LoginButton';
import { FaGithub } from 'react-icons/fa';
import { handleLogin } from '../components/Login';
import { UserContext } from '../hooks/useAuth';


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
  const { userDetails } = React.useContext(UserContext);

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
                    <LoginButton 
                      text={'Login with Github'}
                      icon={<FaGithub size={24} />}
                      onClick={() => handleLogin(githubConfig)
                    }/> 
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