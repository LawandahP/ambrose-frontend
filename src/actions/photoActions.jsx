// src/actions/photoActions.js
import axios from 'axios';

export const fetchAlbumPhotos = async (id, setPhoto, setTitle, setLoading) => {
  setLoading(true);
  try {
    const photoResponse = await axios.get(`https://jsonplaceholder.typicode.com/photos/${id}`);
    setPhoto(photoResponse.data);
    setTitle(photoResponse.data.title);
  } catch (err) {
    console.error('Error fetching photo:', err);
  } finally {
    setLoading(false);
  }
};