/* eslint-disable react/prop-types */
// /* eslint-disable react/prop-types */
// /* eslint-disable no-unused-vars */
import { FaCameraRetro } from 'react-icons/fa';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../hooks/useAuth';

// Define the pages for navigation
const pages = [
  {
    name: "Home",
    path: "/home"
  },
]

// Header component
function Header({handleOpen}) {
  // Get user details and logout function from context
  const { userDetails, logout } = React.useContext(UserContext);

  // State for navigation and user menus
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // Handlers for opening and closing menus
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // Render the header
  return (
    <AppBar position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              ml: 2,
              mr: 4,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            AMBROSE ALBUM
          </Typography>

          {/* Navigation menu for small screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', lg: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <FaCameraRetro />
            </IconButton>

            {/* Render navigation menu if user details are present */}
            { userDetails &&
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page?.name} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <a href={page?.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {page?.name}
                      </a>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            }
          </Box>
        
          {/* Navigation menu for larger screens */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {userDetails?.name &&
              pages.map((page) => (
                <Button
                  key={page?.name}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <a href={page?.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {page?.name}
                  </a>
                </Button>
              ))}
          </Box>
          
          {/* User menu */}
          {userDetails?.name ?
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={userDetails?.name} src={userDetails?.avatar_url} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {/* Display user details and logout option */}
                <MenuItem>
                  <Typography textAlign="center">{userDetails?.login}</Typography>
                </MenuItem>

                <MenuItem onClick={logout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                
            
              </Menu>
            </Box>
            : 
            // Display login button if user is not logged in
            <Box>
              <Button 
                onClick={handleOpen}
                color="inherit">
                Login
              </Button>
            </Box>
          }
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;