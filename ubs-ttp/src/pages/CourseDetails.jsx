// CourseDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5001/api/courses/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch course data');
        return res.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!course) return <Typography>No course found.</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Typography variant="h4" gutterBottom>
        {course.title}
      </Typography>
      <Typography mb={2}>{course.description}</Typography>

      <Stack direction="row" spacing={1} mb={2}>
        {course.tags.map((tag, idx) => (
          <Chip key={idx} label={tag} color="primary" variant="outlined" />
        ))}
      </Stack>

      <Stack direction="row" spacing={3} mb={4}>
        <Typography>
          <StarIcon sx={{ mr: 0.5 }} /> {course.rating || 'N/A'} rating
        </Typography>
        <Typography>
          <PeopleIcon sx={{ mr: 0.5 }} /> {course.students || 'N/A'} students
        </Typography>
        <Typography>
          <AccessTimeIcon sx={{ mr: 0.5 }} /> {course.duration || 'N/A'}
        </Typography>
        <Typography>
          <MenuBookIcon sx={{ mr: 0.5 }} />{' '}
          {course.lessons ||
            (course.sections
              ? course.sections.reduce((acc, sec) => acc + sec.lessons.length, 0)
              : 'N/A')}{' '}
          lessons
        </Typography>
      </Stack>

      <Box mb={4}>
        <Typography variant="h6" gutterBottom>
          Course Content
        </Typography>
        {course.sections.map((section, idx) => (
          <Accordion key={idx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{section.title}</Typography>
              <Chip
                label={`${section.lessons.length} lessons`}
                size="small"
                sx={{ ml: 2 }}
              />
            </AccordionSummary>
            <AccordionDetails>
              {section.lessons.map((lesson, lidx) => (
                <Box key={lidx} mb={2}>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {lesson.title} {lesson.type === 'quiz' ? '(Quiz)' : '(Video)'}
                  </Typography>

                  {lesson.type === 'video' && (
                    <Box
                      component="iframe"
                      src={lesson.url}
                      title={lesson.title}
                      width="100%"
                      height="315"
                      sx={{ border: 'none', borderRadius: 1, mt: 1 }}
                      allowFullScreen
                    />
                  )}

                  {lesson.type === 'quiz' && (
                    <Typography variant="body2" mt={1}>
                      Quiz with {lesson.questions.length} question
                      {lesson.questions.length > 1 ? 's' : ''}.
                    </Typography>
                  )}
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box textAlign="right">
        <Button variant="contained" size="large">
          Enroll Now
        </Button>
      </Box>
    </Container>
  );
};

export default CourseDetails;
