import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Photo from '../components/Photo';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

import Spinner from '../components/Spinner';

import Layout from '../components/Layout';
import { RequireAuthentication} from '../services/authProtection';
import axios from 'axios'
import { toast } from 'react-toastify'
import { logError } from '../services/errorLoggingService';


const PhotoDetails = () => {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState('');
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [ loadingUpdate, setLoadingUpdate ] = useState(false)


  

  useEffect(() => {
    setLoading(true);
    const fetchAlbumPhotos = async () => {
      setLoading(true);
      try {
        const photoResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
        setPhoto(photoResponse.data);
        setTitle(photoResponse.data.title)
        setLoading(false);
      } catch (error) {
        setLoading(false);
        logError(error, 'Error fetching photo');
        throw error;
      }
      
    };
    fetchAlbumPhotos()
  }, [id]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async () => {
    setLoadingUpdate(true);
    try {
      const response = await axios.patch(`https://jsonplaceholder.typicode.com/photos/${id}`, {
        title: title,
      });
      setPhoto(response.data);
      toast.success(`Title Updated to "${response?.data?.title}" successfully`)
      setLoadingUpdate(false);
    } catch (error) {
      setLoadingUpdate(false);
      logError(error, 'Error updating photo title');
      throw error;
    }
  };

  return (
    <Layout>
        {loading ? (
        <Spinner />
        ) : (
        <>
          <h2>Photo Details</h2>
          {photo && (
            <>
              <Photo imgUrl={photo?.url} title={photo?.title} />
              <div style={{marginTop: "25px", display: "flex", alignItems: 'center', gap: '15px'}}>
                <TextField size="small" fullWidth label="Photo Title" type="text" value={title} variant="outlined" onChange={handleTitleChange} />
                {
                  loadingUpdate 
                  ? <CircularProgress />:
                  <Button 
                    variant='contained'
                    onClick={handleSubmit}
                  >
                    Update
                  </Button> 
                }
              </div>
            </>
          )}
        </>
      )}
   </Layout>
  );
};

export default RequireAuthentication(PhotoDetails);
