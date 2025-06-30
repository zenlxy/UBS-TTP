import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box, Button, Chip, Stack, Accordion, AccordionSummary, AccordionDetails, RadioGroup, FormControlLabel, Radio, Alert } from '@mui/material';
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

  // State to store user answers per lesson per question
  // Structure: { lessonIndex: { questionIndex: selectedOptionIndex, ... }, ... }
  const [answers, setAnswers] = useState({});

  // State to store submitted results per lesson per question
  // Structure: { lessonIndex: { questionIndex: boolean(correct/incorrect), ... }, ... }
  const [results, setResults] = useState({});

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

  const handleOptionChange = (lessonIdx, questionIdx, optionIdx) => {
    setAnswers((prev) => ({
      ...prev,
      [lessonIdx]: {
        ...prev[lessonIdx],
        [questionIdx]: optionIdx,
      },
    }));
    // Clear previous result on change
    setResults((prev) => {
      if (
        prev[lessonIdx] &&
        prev[lessonIdx][questionIdx] !== undefined
      ) {
        const newLessonResults = { ...prev[lessonIdx] };
        delete newLessonResults[questionIdx];
        return { ...prev, [lessonIdx]: newLessonResults };
      }
      return prev;
    });
  };

  const handleSubmit = (lessonIdx, questionIdx, correctAnswer) => {
    const userAnswer = answers[lessonIdx]?.[questionIdx];
    if (userAnswer === undefined) return; // no answer selected

    const isCorrect = userAnswer === correctAnswer;
    setResults((prev) => ({
      ...prev,
      [lessonIdx]: {
        ...prev[lessonIdx],
        [questionIdx]: isCorrect,
      },
    }));
  };

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
                // Calculate absolute lesson index to keep answers/results consistent across sections
                const lessonIdx = sidx * 1000 + lidx; // just a unique id

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
                                    disabled={result === true} // disable only if answer is correct
                                  />
                                ))}
                              </RadioGroup>

                              <Button
                                variant="outlined"
                                size="small"
                                onClick={() =>
                                  handleSubmit(lessonIdx, qidx, question.correct)
                                }
                                disabled={result !== undefined || userAnswer === undefined}
                                sx={{ mt: 1 }}
                              >
                                Submit Answer
                              </Button>

                              {result !== undefined && (
                                <Alert
                                  severity={result ? 'success' : 'error'}
                                  sx={{ mt: 1 }}
                                >
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

      <Box textAlign="right">
        <Button variant="contained" size="large">
          Enroll Now
        </Button>
      </Box>
    </Container>
  );
};

export default CourseDetails;