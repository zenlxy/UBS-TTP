import React from 'react';
import { Box, Typography, Chip } from '@mui/material';

const SectionCard = ({ section, onClick }) => {
  const totalLessons = section.lessons.length;
  const completedLessons = section.lessons.filter(lesson => lesson.completed).length;
  const isCompleted = completedLessons === totalLessons;

  return (
    <Box
      onClick={onClick}
      sx={{
        border: '1px solid #ccc',
        borderRadius: 2,
        p: 2,
        backgroundColor: 'white',
        boxShadow: 1,
        cursor: 'pointer',
      }}
    >
      <Typography variant="h6">{section.title}</Typography>
      <Typography variant="body2" color="text.secondary" mt={1}>
        {totalLessons} lessons
      </Typography>
      {isCompleted && (
        <Chip label="Completed" color="success" sx={{ mt: 1 }} />
      )}
    </Box>
  );
};

export default SectionCard;
