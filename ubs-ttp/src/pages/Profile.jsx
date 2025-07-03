import React from 'react';
import {
  Container,
  Typography,
  Avatar,
  Button,
  Box,
  Stack,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any tokens or session state here if needed
    navigate('/'); // Redirect to login page or landing
  };

  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <Avatar sx={{ width: 100, height: 100, mb: 2 }}>U</Avatar>
        <Typography variant="h5">{userName}</Typography>
        <Typography variant="body1" color="text.secondary">{userEmail}</Typography>

        <Divider sx={{ my: 3, width: '100%' }} />

        <Stack spacing={2} width="100%">
          <Button variant="contained" color="primary" fullWidth>
            Edit Profile
          </Button>
          <Button variant="outlined" color="error" fullWidth onClick={handleLogout}>
            Logout
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Profile;
