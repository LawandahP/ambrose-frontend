// src/actions/photoActions.js
import axios from 'axios';
import { logError } from '../services/errorLoggingService';

export const fetchAlbumPhotos = async (id, setPhoto, setTitle, setLoading) => {
  setLoading(true);
  try {
    const photoResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
    setPhoto(photoResponse.data);
    setTitle(photoResponse.data.title);
  } catch (error) {
    logError(error, 'Error fetching photo');
    throw error;
  } finally {
    setLoading(false);
  }
};