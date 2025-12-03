'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';

export default function AboutPage() {
    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                    About CourseOnline
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: 'auto' }}>
                    We are on a mission to transform the way people learn. Our platform connects expert instructors with eager learners from around the globe.
                </Typography>
            </Box>

            <Grid container spacing={6} alignItems="center" sx={{ mb: 8 }}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        component="img"
                        src="https://watermark.lovepik.com/photo/20211122/large/lovepik-business-team-meeting-room-for-discussion-picture_500710776.jpg"
                        alt="Our Team"
                        sx={{ width: '100%', borderRadius: 4, boxShadow: 3 }}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                        Our Story
                    </Typography>
                    <Typography paragraph color="text.secondary">
                        Founded in 2025, CourseOnline started with a simple idea: quality education should be accessible to everyone, everywhere. We believe that learning is a lifelong journey, and we are here to support you every step of the way.
                    </Typography>
                    <Typography paragraph color="text.secondary">
                        Today, we host thousands of courses across various disciplines, helping millions of students achieve their personal and professional goals.
                    </Typography>
                </Grid>
            </Grid>

            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Meet Our Team
                </Typography>
            </Box>

            <Grid container spacing={4}>
                {[1, 2, 3].map((item) => (
                    <Grid key={item} size={{ xs: 12, sm: 4 }}>
                        <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                            <Avatar
                                src={`https://source.unsplash.com/random/150x150?person=${item}`}
                                sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                            />
                            <Typography variant="h6" fontWeight="bold">
                                Team Member {item}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Co-Founder & CEO
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
