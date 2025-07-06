import React from 'react';
import Header from './Header';
import SideBar from './SideBar';
import { Box, Toolbar } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Box display="flex">
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar /> {/* adds space equal to AppBar height */}
          {children}
        </Box>
      </Box>
    </>
  );
};

export default Layout;
