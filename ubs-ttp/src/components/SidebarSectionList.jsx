import React from 'react';
import { Box, Typography } from '@mui/material';

const SidebarSectionList = ({ sections, selectedIndex, onSelect }) => {
  return (
    <Box width="25%" mr={3}>
      <Typography variant="subtitle1" mb={1}>Sections</Typography>
      {sections.map((section, idx) => (
        <Box
          key={idx}
          sx={{
            p: 1,
            backgroundColor: idx === selectedIndex ? '#e3f2fd' : 'transparent',
            borderRadius: 1,
            cursor: 'pointer'
          }}
          onClick={() => onSelect(idx)}
        >
          <Typography>{section.title}</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default SidebarSectionList;
