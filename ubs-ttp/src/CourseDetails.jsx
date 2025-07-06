import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
  Stack,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const mockCourse = {
  id: 1,
  title: 'Web Development Fundamentals',
  description: 'Learn the core concepts of modern web development...',
  tags: ['Web Development', 'Beginner'],
  rating: 4.7,
  students: 3457,
  duration: '8 weeks',
  lessons: 24,
  sections: [
    {
      title: 'HTML Foundations',
      lessons: ['What is HTML?', 'Tags & Structure', 'Forms & Inputs'],
    },
    {
      title: 'CSS Styling',
      lessons: ['Selectors & Specificity', 'Flexbox & Grid', 'Animations'],
    },
    {
      title: 'JavaScript Essentials',
      lessons: ['Variables & Types', 'Functions & Events', 'DOM Manipulation'],
    },
  ],
};

const CourseDetails = () => {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        {mockCourse.title}
      </Typography>
      <Typography mb={2}>{mockCourse.description}</Typography>

      <Stack direction="row" spacing={1} mb={2}>
        {mockCourse.tags.map((tag, idx) => (
          <Chip key={idx} label={tag} color="primary" variant="outlined" />
        ))}
      </Stack>

      <Stack direction="row" spacing={3} mb={4}>
        <Typography><StarIcon sx={{ mr: 0.5 }} /> {mockCourse.rating} rating</Typography>
        <Typography><PeopleIcon sx={{ mr: 0.5 }} /> {mockCourse.students} students</Typography>
        <Typography><AccessTimeIcon sx={{ mr: 0.5 }} /> {mockCourse.duration}</Typography>
        <Typography><MenuBookIcon sx={{ mr: 0.5 }} /> {mockCourse.lessons} lessons</Typography>
      </Stack>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>Course Content</Typography>
        {mockCourse.sections.map((section, idx) => (
          <Accordion key={idx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{section.title}</Typography>
              <Chip label={`${section.lessons.length} lessons`} size="small" sx={{ ml: 2 }} />
            </AccordionSummary>
            <AccordionDetails>
              {section.lessons.map((lesson, lidx) => (
                <Typography key={lidx} variant="body2" mb={1}>
                  • {lesson}
                </Typography>
              ))}
              {/* Optional: add buttons or media components here */}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box textAlign="right">
        <Button variant="contained" size="large">Enroll Now</Button>
      </Box>
    </Container>
  );
};

export default CourseDetails;
