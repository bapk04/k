'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { courses } from '@/data/courses';
import { CartItem } from '@/context/CartContext';

export default function MyCoursesPage() {
    const { user, loading } = useAuth();
    const router = useRouter();

    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><Typography>Loading...</Typography></Box>;
    }

    if (!user) {
        return null; // Or a loading spinner
    }

    const myCourses = user.myCourses || [];

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                My Learning
            </Typography>

            {myCourses.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 8 }}>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        You haven't enrolled in any courses yet.
                    </Typography>
                    <Button variant="contained" href="/courses" sx={{ mt: 2 }}>
                        Browse Courses
                    </Button>
                </Box>
            ) : (
                <Grid container spacing={4}>
                    {myCourses.map((userCourse: CartItem) => {
                        // Find the latest course data to get the updated image
                        const courseData = courses.find(c => c.id === userCourse.id) || userCourse;

                        return (
                            <Grid key={courseData.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderRadius: 2 }}>
                                    <CardMedia
                                        component="img"
                                        height="160"
                                        image={courseData.image}
                                        alt={courseData.title}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h6" component="h2" sx={{ fontWeight: 600, lineHeight: 1.3 }}>
                                            {courseData.title}
                                        </Typography>
                                        <Button
                                            variant="contained"
                                            fullWidth
                                            startIcon={<PlayCircleOutlineIcon />}
                                            sx={{ mt: 2 }}
                                            href={`/courses/${courseData.id}`}
                                        >
                                            Start Learning
                                        </Button>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}
                </Grid>
            )}
        </Container>
    );
}
