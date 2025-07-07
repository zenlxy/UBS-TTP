import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Typography, Grid, Card, CardMedia, CardContent, CircularProgress, Box, Stack, } from '@mui/material';
import imageMap from '../assets/imageMap'; 
import StarIcon from '@mui/icons-material/Star';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const CategoryCourses = () => {
  const { category } = useParams();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTitle = (slug) => {
    const titleMap = {
      'all-courses': 'All',
      'web-development': 'Web Development',
      'mobile-apps': 'Mobile Apps',
      'data-science': 'Data Science',
      'ai-ml': 'AI/ML',
      'devops': 'DevOps',
      'cybersecurity': 'Cybersecurity',
      'ui-ux-design': 'UI/UX Design',
    };
    return `${titleMap[slug] || slug.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())} Courses`;
  };

  useEffect(() => {
    const fetchCategoryCourses = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5001/api/category/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryCourses();
  }, [category]);

  return (
    <Container>
      <Box mt={4} mb={2}>
        <Typography variant="h4" gutterBottom>
          {formatTitle(category)}
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" align="center">
          {error}
        </Typography>
      ) : courses.length === 0 ? (
        <Typography align="center">No courses found for this category.</Typography>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => {
            const imageSrc = imageMap[course.image] || '';
            return (
              <Grid item xs={12} sm={6} md={4} key={course.id}>
                <Link
                  to={`/courses/${course.id}`}
                  style={{ textDecoration: 'none' }}
                  aria-label={`Go to details for ${course.title}`}
                >
                  <Card
                    sx={{
                      height: 370,
                      width: 500,
                      display: 'flex',
                      flexDirection: 'column',
                      cursor: 'pointer',
                      '&:hover': { boxShadow: 6 },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={imageSrc}
                      alt={course.title}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <Box>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                          <Typography variant="h6" color="textPrimary" fontWeight="bold">
                            {course.title}
                          </Typography>
                          <Stack direction="row" alignItems="center" spacing={0.5}>
                            <StarIcon fontSize="small" color="warning" />
                            <Typography variant="body2" color="textSecondary">
                              {course.rating}
                            </Typography>
                          </Stack>
                        </Stack>
                        <Typography variant="body2" color="textSecondary" gutterBottom>
                          {course.description}
                        </Typography>
                      </Box>
                      <Stack direction="row" justifyContent="space-between">
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <GroupIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="textSecondary">
                            {course.students}
                          </Typography>
                        </Stack>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          <AccessTimeIcon fontSize="small" color="action" />
                          <Typography variant="body2" color="textSecondary">
                            {course.duration}
                          </Typography>
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Container>
  );
};

export default CategoryCourses;
