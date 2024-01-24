import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Layout from '../components/Layout';
import { RequireAuthentication } from '../services/authProtection';
import { UserContext } from '../hooks/useAuth';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [albums, setAlbums] = useState([]);

  const navigate = useNavigate();
  const { userDetails } = React.useContext(UserContext);

  const columns = [
    { id: 1, label: 'User', maxWidth: 170 },
    { id: 2, label: 'Albums', maxWidth: 100, align: 'right'},
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const userResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/`);
        setUsers(userResponse.data);
        const albumsResponse = await axios.get(`https://jsonplaceholder.typicode.com/albums`);
        setAlbums(albumsResponse.data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  const userAlbumCounts = users.map(user => ({
    ...user,
    albumCount: albums.filter(album => album.userId === user.id).length
  }));

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h2>Welcome, {userDetails?.name}</h2>
          <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {userAlbumCounts.map((user) => (
                <TableRow
                  key={user.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Typography 
                      sx={{ cursor: 'pointer', color: 'gray', ":hover": { color: 'blue'}}}
                      onClick={() => navigate(`/user/${user.id}`)}>
                     {user?.name}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">{user?.albumCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </>
    )}
    </Layout>
  );
};

export default RequireAuthentication(HomePage);