import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Paper, Container } from '@mui/material';
import UserProfileForm from '../components/UserProfileForm';

function Onboarding() {
  const navigate = useNavigate();

  const handleSubmit = (profile) => {
    localStorage.setItem('userProfile', JSON.stringify(profile));
    navigate('/home'); // redirect to Home after submission
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Set Up Your Learning Profile
      </Typography>
      <Paper elevation={3} sx={{ padding: 3 }}>
        <UserProfileForm onSubmit={handleSubmit} />
      </Paper>
    </Container>
  );
}

export default Onboarding;
