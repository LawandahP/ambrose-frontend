/* eslint-disable no-unused-vars */
import React from 'react';
import Header from './components/Header';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Outlet } from "react-router-dom";

import { UserAuth } from './hooks/useAuth';

import Login from './components/Login'


const App = () => {
  const [open, setOpen] = React.useState(false); // State to control modal visibility
  const handleOpen = () => setOpen(true); // Function to open modal
  const handleClose = () => setOpen(false); // Function to close modal

  // Modal style
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };


  return (
    <UserAuth>
      
      {/* ToastContainer for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      {/* Header component with handleOpen function as prop */}
      <Header handleOpen={handleOpen}/>

      {/* Routing component for handling routes */}
      {/* <Routing /> */}
      <Outlet />

      {/* Modal component for login */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* Login component inside modal */}
          <Login />
        </Box>
        </Modal>
    </UserAuth>
    
     
  );
};

export default App;