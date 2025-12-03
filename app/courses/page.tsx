'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import CourseCard from '@/components/Course/CourseCard';
import { courses, categories } from '@/data/courses';

export default function CoursesPage() {
    const [selectedCategory, setSelectedCategory] = React.useState('All');

    const filteredCourses = selectedCategory === 'All'
        ? courses
        : courses.filter(course => course.category === selectedCategory);

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                Explore Courses
            </Typography>

            {/* Category Filter */}
            <Box sx={{ mb: 6, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category) => (
                    <Chip
                        key={category}
                        label={category}
                        onClick={() => setSelectedCategory(category)}
                        color={selectedCategory === category ? 'primary' : 'default'}
                        variant={selectedCategory === category ? 'filled' : 'outlined'}
                        clickable
                        sx={{ fontSize: '1rem', px: 1, py: 0.5 }}
                    />
                ))}
            </Box>

            {/* Course Grid */}
            <Grid container spacing={4}>
                {filteredCourses.map((course) => (
                    <Grid key={course.id} size={{ xs: 12, sm: 6, md: 4 }}>
                        <CourseCard {...course} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
