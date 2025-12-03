'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import CourseCard from '@/components/Course/CourseCard';
import Link from 'next/link';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const featuredCourses = [
  {
    "id": "1",
    "title": "Full-Stack Web Development Bootcamp",
    "description": "Become a full-stack web developer with just one course. HTML, CSS, Javascript, Node, React, MongoDB and more!",
    "image": "https://images.unsplash.com/photo-1542831371-29b0f74f9713?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "category": "Development",
    "rating": 4.8,
    "price": "$19.99"
  },
  {
    "id": "2",
    "title": "Data Science and Machine Learning",
    "description": "Learn Python, Data Science, Machine Learning and Deep Learning from scratch.",
    "image": "https://tse2.mm.bing.net/th/id/OIP.qSUDRTVzjFFY2j-9B59JqwHaEK?rs=1&pid=ImgDetMain&o=7&rm=3",
    "category": "Data Science",
    "rating": 4.9,
    "price": "$24.99"
  },
  {
    "id": "3",
    "title": "Digital Marketing Masterclass",
    "description": "Master Digital Marketing Strategy, Social Media Marketing, SEO, YouTube, Email, Facebook Marketing, Analytics & More!",
    "image": "https://www.kayshowuniversity.com/wp-content/uploads/2021/07/Online-Digital-Marketing-Training-1.jpg",
    "category": "Marketing",
    "rating": 4.7,
    "price": "$14.99"
  }
];

export default function Home() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          py: { xs: 8, md: 12 },
          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 800 }}>
                Unlock Your Potential with Online Learning
              </Typography>
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.9, fontWeight: 400 }}>
                Discover thousands of courses from top instructors. Learn at your own pace, anytime, anywhere.
              </Typography>
              <Button
                variant="contained"
                size="large"
                component={Link}
                href="/courses"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: 'white',
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: 'grey.100',
                  },
                  px: 4,
                  py: 1.5,
                  fontSize: '1.1rem',
                }}
              >
                Explore Courses
              </Button>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="https://scontent.fdad3-1.fna.fbcdn.net/v/t39.30808-6/489785062_1322971652803202_7358284271986045852_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=Hyt7sdtPGYEQ7kNvwEOFq8n&_nc_oc=Adm7H-bgQhVeMlC3XnHAmGW8GipsWhX4RmViZ8O9y7X12rVgMG5_izdQZknQDEOPY8I&_nc_zt=23&_nc_ht=scontent.fdad3-1.fna&_nc_gid=uyDOMEPZ1re9cMRAfW3_dA&oh=00_AfnYoysmDq3MvmYO-eRuKGaskJzuljvoFmQkpXNH5JS8aQ&oe=69358A88"
                alt="Learning"
                sx={{
                  width: '100%',
                  borderRadius: 4,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Featured Courses */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h2" sx={{ fontWeight: 700 }}>
            Featured Courses
          </Typography>
          <Button component={Link} href="/courses" endIcon={<ArrowForwardIcon />}>
            View All
          </Button>
        </Box>
        <Grid container spacing={4}>
          {featuredCourses.map((course) => (
            <Grid key={course.id} size={{ xs: 12, sm: 6, md: 4 }}>
              <CourseCard {...course} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
