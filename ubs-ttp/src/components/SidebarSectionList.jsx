import React, { useState } from 'react';
import { Box, Typography, Snackbar, Alert } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const SidebarSectionList = ({ sections, selectedIndex, onSelect, accessMap }) => {
  const [showLockedSnackbar, setShowLockedSnackbar] = useState(false);

  const handleLockedClick = () => {
    setShowLockedSnackbar(true);
  };

  return (
    <>
      <Box width="25%" mr={3}>
        <Typography variant="subtitle1" mb={1}>Sections</Typography>
        {sections.map((section, idx) => {
          const isAccessible = accessMap?.[idx];
          const isSelected = idx === selectedIndex;
          const completedLessons = section.lessons.filter(lesson => lesson.completed).length;
          const totalLessons = section.lessons.length;
          const isCompleted = completedLessons === totalLessons;

          return (
            <Box
              key={idx}
              sx={{
                p: 1,
                border: '1px solid',
                borderColor: isAccessible
                  ? (isSelected ? '#1976d2' : '#90caf9')
                  : '#ccc',
                backgroundColor: isAccessible
                  ? (isSelected ? '#e3f2fd' : 'white')
                  : '#f5f5f5',
                borderRadius: 2,
                cursor: isAccessible ? 'pointer' : 'not-allowed',
                color: isAccessible ? 'inherit' : 'gray',
                opacity: isAccessible ? 1 : 0.6,
                mb: 1,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'row',
              }}
              onClick={() => {
                if (isAccessible) {
                  onSelect(idx);
                } else {
                  handleLockedClick();
                }
              }}
            >
              {/* Icon */}
              <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
                {isCompleted && !isSelected ? (
                  <CheckCircleIcon sx={{ fontSize: 24, color: 'green' }} />
                ) : isSelected ? (
                  <PlayArrowIcon sx={{ fontSize: 24, color: '#1976d2' }} />
                ) : !isAccessible ? (
                  <LockIcon sx={{ fontSize: 24, color: '#999' }} />
                ) : null}
              </Box>

              {/* Section Title and Labels */}
              <Box>
                <Typography variant="body2">{section.title}</Typography>

                {isSelected && (
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: '#1976d2',
                      color: 'white',
                      borderRadius: '15px',
                      padding: '2px 10px',
                      fontWeight: 'bold',
                      marginTop: 0.5,
                      display: 'inline-block',
                    }}
                  >
                    Current
                  </Typography>
                )}

                {isCompleted && !isSelected && (
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: 'green',
                      color: 'white',
                      borderRadius: '15px',
                      padding: '2px 10px',
                      fontWeight: 'bold',
                      marginTop: 0.5,
                      display: 'inline-block',
                    }}
                  >
                    Completed
                  </Typography>
                )}

                {!isAccessible && (
                  <Typography
                    variant="caption"
                    sx={{
                      backgroundColor: '#f5f5f5',
                      color: '#999',
                      borderRadius: '15px',
                      padding: '2px 10px',
                      fontWeight: 'bold',
                      marginTop: 0.5,
                      display: 'inline-block',
                    }}
                  >
                    Locked
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>

      {/* Snackbar for locked section click */}
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

export default SidebarSectionList;
