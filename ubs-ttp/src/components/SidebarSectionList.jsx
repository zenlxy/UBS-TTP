import React from 'react';
import { Box, Typography } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; 

const SidebarSectionList = ({ sections, selectedIndex, onSelect, accessMap, onLockedClick }) => {
  return (
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
                onLockedClick?.();
              }
            }}
          >
            {/* Icon (Completed, Current, Locked) */}
            <Box sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
              {isCompleted && !isSelected ? (
                // Green tick for completed courses but not selected
                <CheckCircleIcon sx={{ fontSize: 24, color: 'green' }} />
              ) : isSelected ? (
                // Blue play button for the current course
                <PlayArrowIcon sx={{ fontSize: 24, color: '#1976d2' }} />
              ) : !isAccessible ? (
                // Grey lock for locked courses
                <LockIcon sx={{ fontSize: 24, color: '#999' }} />
              ) : null}
            </Box>

            {/* Section Title and Labels */}
            <Box>
              <Typography variant="body2">
                {section.title}
              </Typography>

              {/* If the section is selected, show "Current" label */}
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

              {/* If the section is completed but not selected, show "Completed" label */}
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

              {/* If the section is locked, show "Locked" label */}
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
  );
};

export default SidebarSectionList;
