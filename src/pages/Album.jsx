import React, { useState, useEffect } from 'react';
import { useParams, Link } from "react-router-dom";
import { RequireAuthentication } from '../services/authProtection';

import PhotoCard from '../components/Photo'
import Grid from '@mui/material/Grid';
import Layout from '../components/Layout';
import axios from 'axios'
import Spinner from '../components/Spinner';
import { logError } from '../services/errorLoggingService';


const AlbumPage = () => {
  // State hooks for album data, photos, and loading state
  const [album, setAlbum] = useState(null);
  const [photos, setPhotos] = useState([]);

  // Hooks for getting route parameters and navigation
  const { id } = useParams();
  const [loading, setLoading] = useState(false);

  // Effect hook to fetch album and photos data when component mounts or id changes
  useEffect(() => {
    const fetchAlbumPhotos = async () => {
      setLoading(true);
      try {
        // Fetching user album data
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums/${id}`);
        setAlbum(userResponse.data);

        // Fetching album's photos data
        const albumsResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`);
        setPhotos(albumsResponse.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        logError(error, 'Error fetching album and photos');
        throw error;
      }
      
    };

    fetchAlbumPhotos();
  }, [id]);

  return (
    <Layout>
        {loading ? (
        <Spinner />
      ) : (
        <>
          {album && <h2>{album.title} Album Photos</h2>}
          <Grid container spacing={4}>
            {/* Mapping over photos array to render PhotoCard components */}
              {photos.map(photo => (
                  <Grid 
                    key={photo?.id}
                    style={{cursor: 'pointer'}}
                    item  xs={12} sm={6} md={4}>
                      <Link to={`/photo/${photo.id}`} 
                        style={{ textDecoration: 'none', color: 'inherit' }}>
                        <PhotoCard 
                            imgUrl={photo?.url} title={photo?.title}
                        />
                      </Link>
                  </Grid>
              ))}
          </Grid>
        </>
      )}
    </Layout>
  );
};

export default RequireAuthentication(AlbumPage);