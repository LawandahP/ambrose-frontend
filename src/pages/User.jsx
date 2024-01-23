/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import Layout from '../components/Layout';
import { RequireAuthentication } from '../services/authProtection';
import axios from 'axios'
import Spinner from '../components/Spinner';

const UserPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [albums, setAlbums] = useState([]);
  const navigate = useNavigate();
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
      } catch (err) {
        setLoading(false);
        console.error('Error fetching data:', err);
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
              <>
              <ListItemButton key={album.id} onClick={() => navigate(`/album/${album.id}`)}>
                <ListItemIcon>
                  {index + 1}
                </ListItemIcon>
                <ListItemText id={`list-item-${album?.id}`} primary={album?.title} />
              </ListItemButton>
              <Divider />
              </>
            ))}
        </List>
      </>   
    )}
  </Layout>
  );
};

export default RequireAuthentication(UserPage);