import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Avatar, Tooltip, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  return (
    <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: 'bold', color: '#7b2ff7', cursor: 'pointer' }}
          onClick={() => navigate('/home')}
        >
          SheLearnsTech
        </Typography>
        <Box>
          <Tooltip title="Profile">
            <IconButton onClick={() => navigate('/profile')} size="large">
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                {userName?.[0]?.toUpperCase() || 'U'}
              </Avatar>
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
