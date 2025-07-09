import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip, Stack, Accordion, AccordionSummary, AccordionDetails, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StarIcon from '@mui/icons-material/Star';
import PeopleIcon from '@mui/icons-material/People';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState({});

  const userId = localStorage.getItem('userId'); // Assumes userId saved in localStorage

  useEffect(() => {
    fetch(`http://localhost:5001/api/course/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch course data');
        return res.json();
      })
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  const handleOptionChange = (lessonIdx, questionIdx, optionIdx) => {
    setAnswers(prev => ({
      ...prev,
      [lessonIdx]: {
        ...prev[lessonIdx],
        [questionIdx]: optionIdx,
      },
    }));

    setResults(prev => {
      if (prev[lessonIdx] && prev[lessonIdx][questionIdx] !== undefined) {
        const newLessonResults = { ...prev[lessonIdx] };
        delete newLessonResults[questionIdx];
        return { ...prev, [lessonIdx]: newLessonResults };
      }
      return prev;
    });
  };

  const handleSubmitAnswer = (lessonIdx, questionIdx, correctAnswer) => {
    const userAnswer = answers[lessonIdx]?.[questionIdx];
    if (userAnswer === undefined) return;

    const isCorrect = userAnswer === correctAnswer;
    setResults(prev => ({
      ...prev,
      [lessonIdx]: {
        ...prev[lessonIdx],
        [questionIdx]: isCorrect,
      },
    }));
  };

  const handleEnroll = async () => {
    if (!userId) {
      alert('Please log in to enrol in courses.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/api/enrol/${userId}/${id}`, {
        method: 'POST',
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to enrol');
      }
      alert('Successfully enrolled!');
      // Optionally, you could update UI or redirect
      navigate('/home');
    } catch (err) {
      alert(`Error enrolling: ${err.message}`);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!course) return <Typography>No course found.</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Box mb={2}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/home')}
          sx={{ mb: 3, borderColor: 'primary.main', color: 'primary.main' }}
        >
          Back to Home
        </Button>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4" gutterBottom>
            {course.title}
          </Typography>
          <Button variant="contained" size="large" onClick={handleEnroll}>
            Enrol Now
          </Button>
        </Box>
      </Box>

      <Typography mb={2}>{course.description}</Typography>

      <Stack direction="row" spacing={1} mb={2}>
        {course.tags.map((tag, idx) => (
          <Chip key={idx} label={tag} color="primary" variant="outlined" />
        ))}
      </Stack>

      <Stack direction="row" spacing={3} mb={4}>
        <Typography sx={{ display: 'flex' }}>
          <StarIcon sx={{ mr: 0.5 }} /> {course.rating || '4.5'} rating
        </Typography>
        <Typography sx={{ display: 'flex' }}>
          <PeopleIcon sx={{ mr: 0.5 }} /> {course.students || '923'} students
        </Typography>
        <Typography sx={{ display: 'flex' }}>
          <AccessTimeIcon sx={{ mr: 0.5 }} /> {course.duration || '3 hours'}
        </Typography>
        <Typography sx={{ display: 'flex' }}>
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
        {course.sections.map((section, sidx) => (
          <Accordion key={sidx}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{section.title}</Typography>
              <Chip
                label={`${section.lessons.length} lessons`}
                size="small"
                sx={{ ml: 2 }}
              />
            </AccordionSummary>
            <AccordionDetails>
              {section.lessons.map((lesson, lidx) => {
                const lessonIdx = sidx * 1000 + lidx;

                return (
                  <Box key={lidx} mb={4}>
                    <Typography variant="subtitle1" fontWeight="bold">
                      {lesson.title}
                    </Typography>

                    {lesson.type === 'video' && (
                      <Box
                        component="iframe"
                        src={lesson.url}
                        title={lesson.title}
                        width="100%"
                        height="450px"
                        sx={{ border: 'none', borderRadius: 1, mt: 1 }}
                        allowFullScreen
                      />
                    )}

                    {lesson.type === 'quiz' && (
                      <Box mt={1} sx={{ pl: 2 }}>
                        {lesson.questions.map((question, qidx) => {
                          const userAnswer = answers[lessonIdx]?.[qidx];
                          const result = results[lessonIdx]?.[qidx];

                          return (
                            <Box key={qidx} mb={3}>
                              <Typography variant="subtitle2" fontWeight="bold">
                                Q{qidx + 1}: {question.q}
                              </Typography>
                              <RadioGroup
                                value={userAnswer !== undefined ? String(userAnswer) : ''}
                                onChange={(e) =>
                                  handleOptionChange(lessonIdx, qidx, Number(e.target.value))
                                }
                              >
                                {question.options.map((option, oidx) => (
                                  <FormControlLabel
                                    key={oidx}
                                    value={String(oidx)}
                                    control={<Radio />}
                                    label={option}
                                    disabled={result === true}
                                  />
                                ))}
                              </RadioGroup>

                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() =>
                                  handleSubmitAnswer(lessonIdx, qidx, question.correct)
                                }
                                disabled={result !== undefined || userAnswer === undefined}
                                sx={{ mt: 1 }}
                              >
                                Submit Answer
                              </Button>

                              {result !== undefined && (
                                <Alert severity={result ? 'success' : 'error'} sx={{ mt: 1 }}>
                                  {result ? 'Correct!' : 'Incorrect. Try again.'}
                                </Alert>
                              )}
                            </Box>
                          );
                        })}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default CourseDetails;
