import React, { useState } from 'react';
import { Box, Typography, Chip, Snackbar, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const SectionCard = ({ section, isLocked, isSelected, onClick }) => {
  const [showLockedSnackbar, setShowLockedSnackbar] = useState(false);

  const totalLessons = section.lessons.length;
  const completedLessons = section.lessons.filter(lesson => lesson.completed).length;
  const isCompleted = completedLessons === totalLessons;

  const borderColor = isLocked ? '#ccc' : isSelected ? '#1976d2' : '#1976d2';
  const opacity = isLocked ? 0.5 : 1;

  const handleClick = () => {
    if (isLocked) {
      setShowLockedSnackbar(true);
    } else {
      onClick();
    }
  };

  return (
    <>
      <Box
        onClick={handleClick}
        sx={{
          border: `1px solid ${borderColor}`,
          borderRadius: 2,
          p: 2,
          backgroundColor: 'white',
          boxShadow: isSelected ? 3 : 1,
          cursor: isLocked ? 'not-allowed' : 'pointer',
          opacity,
          position: 'relative',
        }}
      >
        <Typography variant="h6">{section.title}</Typography>
        <Typography variant="body2" color="text.secondary" mt={1}>
          {totalLessons} lessons
        </Typography>
        {isCompleted && (
          <Chip label="Completed" color="success" sx={{ mt: 1 }} />
        )}
        {isLocked && (
          <LockIcon
            sx={{
              position: 'absolute',
              top: '50%',
              right: 20,
              color: '#888',
              transform: 'translateY(-50%)',
            }}
          />
        )}
      </Box>

      <Snackbar
        open={showLockedSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowLockedSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setShowLockedSnackbar(false)}
          severity="info"
          sx={{ width: '100%' }}
        >
          You must complete the previous section to unlock this one.
        </Alert>
      </Snackbar>
    </>
  );
};

export default SectionCard;
