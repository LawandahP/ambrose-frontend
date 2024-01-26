import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import Layout from '../components/Layout';
import { RequireAuthentication } from '../services/authProtection';
import axios from 'axios'
import Spinner from '../components/Spinner';
import { logError } from '../services/errorLoggingService';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`);
        setUser(userResponse.data);
        const albumsResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums?userId=${id}`);
        setAlbums(albumsResponse.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        logError(error, 'Error user and users albums');
        throw error;
      }
      
    };

    fetchUserData();
  }, [id]);

  return (
    <Layout>    
      {loading ? (
        <Spinner />
      ) : (
        <>       
          {user && <h2>{user.name} Albums</h2>}
          
          <List
            sx={{ 
              width: '100%', bgcolor: 'background.paper', 
              boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;',
              borderRadius: '5px'
            }}
          >
            {albums.map((album, index) => (
              <div key={album?.id}>
                  <ListItemButton>
                    <ListItemIcon>
                      {index + 1}
                    </ListItemIcon>

                    <Link to={`/album/${album.id}`}
                       style={{ textDecoration: 'none', color: 'inherit'}}>
                      <ListItemText 
                        id={`list-item-${album?.id}`}
                        primary={album?.title}
                       />
                     </Link>
                  </ListItemButton>
                <Divider />
              </div>
              
            ))}
        </List>
      </>   
    )}
  </Layout>
  );
};

export default RequireAuthentication(UserPage);