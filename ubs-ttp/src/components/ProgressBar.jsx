import React from 'react';
import { Box, Typography } from '@mui/material';

const ProgressBar = ({ completed, total }) => {
  const progress = Math.round((completed / total) * 100);

  return (
    <Box mb={3}>
      <Typography variant="body2" mb={0.5}>
        {completed} of {total} lessons completed
      </Typography>
      <Box
        sx={{
          width: '100%',
          height: 10,
          backgroundColor: '#e0e0e0',
          borderRadius: 5,
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: `${progress}%`,
            backgroundColor: '#1976d2',
          }}
        />
      </Box>
    </Box>
  );
};

export default ProgressBar;
