import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Container, Box, Button } from '@mui/material';

import courses from '../../backend/data/courses'; 

const CourseDetails = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  // Find course by id (courseId will be a string, convert to number)
  const course = courses.find(c => c.id === parseInt(courseId, 10));

  if (!course) {
    return (
      <Container>
        <Typography variant="h5" color="error" sx={{ mt: 4 }}>
          Course not found
        </Typography>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>
        {course.title}
      </Typography>
      <Typography variant="body1" mb={3}>
        {course.description}
      </Typography>

      <Typography variant="h6">Milestones:</Typography>
      {course.milestones.map((ms) => (
        <Box key={ms.id} mb={2} p={2} border={1} borderColor="grey.300" borderRadius={2}>
          <Typography variant="subtitle1">{ms.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {ms.type.charAt(0).toUpperCase() + ms.type.slice(1)}
          </Typography>
          {/* Optionally, you can render videos, quizzes, or tutorials here */}
          {ms.type === 'video' && (
            <Box mt={1}>
              <iframe
                width="100%"
                height="315"
                src={ms.content}
                title={ms.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Box>
          )}
        </Box>
      ))}

      <Button variant="outlined" onClick={() => navigate('/')} sx={{ mt: 4 }}>
        Back to Home
      </Button>
    </Container>
  );
};

export default CourseDetails;
