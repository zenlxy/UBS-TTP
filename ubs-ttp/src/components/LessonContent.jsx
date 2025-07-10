import React, { useEffect } from 'react';
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Button, Alert } from '@mui/material';

const LessonContent = ({
  lesson,
  lessonIdx,
  answers,
  results,
  handleOptionChange,
  handleSubmitAnswer,
  markLessonAsComplete,
}) => {
  useEffect(() => {
    if (
      lesson.type === 'quiz' &&
      lesson.questions.every((q, idx) => results[lessonIdx]?.[idx] === true)
    ) {
      markLessonAsComplete();
    }
  }, [results]);

  return (
    <Box mb={4}>
      <Typography variant="subtitle1" fontWeight="bold">
        {lesson.title}
      </Typography>

      {lesson.type === 'video' && (
        <>
          <Box
            component="iframe"
            src={lesson.url}
            title={lesson.title}
            width="100%"
            height="450px"
            sx={{ border: 'none', borderRadius: 1, mt: 1 }}
            allowFullScreen
          />
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 2 }}
            onClick={markLessonAsComplete}
          >
            Mark as Complete
          </Button>
        </>
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
};

export default LessonContent;
