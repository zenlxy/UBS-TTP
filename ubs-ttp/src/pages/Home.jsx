import React, { useEffect, useState } from 'react';
import { Typography, Container, CircularProgress, Box } from '@mui/material';

const Home = () => {
  const userName = localStorage.getItem('userName');
  const [interests, setInterests] = useState(() => JSON.parse(localStorage.getItem('interests')) || []);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("Current interests:", interests); 
    const fetchRecommendations = async () => {
      setLoading(true);
      setError(null);

      if (!interests || interests.length === 0) {
        setError('Please provide some interests to get recommendations.');
        setLoading(false);
        return;
      }

      const cacheKey = `recommendations_${interests.join('_')}`;
      const cachedRecommendations = localStorage.getItem(cacheKey);

      if (cachedRecommendations) {
        try {
          setCourses(JSON.parse(cachedRecommendations));
          setLoading(false);
          return;
        } catch (parseError) {
          console.error('Failed to parse cached recommendations:', parseError);
          // Fall through to fetch new data if cache is invalid
        }
      }

      try {
        console.log("Sending interests to backend:", interests);
        const response = await fetch('http://localhost:5001/api/recommendation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ interests }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch recommendations');
        }

        const data = await response.json();
        if (data.recommendations) {
          setCourses(data.recommendations);
          localStorage.setItem(cacheKey, JSON.stringify(data.recommendations));
        } else {
          setCourses([]);
        }
      } catch (error) {
        console.error('Failed to fetch recommendations:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, [interests]);

  // Listen for changes to localStorage (e.g., from another tab)
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === 'interests') {
        setInterests(JSON.parse(event.newValue || '[]'));
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mt: 4 }}>
        Welcome Back{userName ? `, ${userName}` : ''}!
      </Typography>
      <Typography mb={2}>Your personalised recommendations will appear here.</Typography>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : courses.length === 0 ? (
        <Typography align="center">
          No recommendations available. Try adding some interests!
        </Typography>
      ) : (
        <Box>
          {courses.map((course, index) => (
            <Box key={index} mb={2} p={2} border={1} borderColor="grey.300" borderRadius={2}>
              <Typography variant="h6">{course.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {course.description}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default Home;