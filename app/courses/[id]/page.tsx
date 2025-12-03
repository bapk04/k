'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Rating from '@mui/material/Rating';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useParams, notFound, useRouter } from 'next/navigation';
import { courses } from '@/data/courses';
import VideoPlayer from '@/components/Course/VideoPlayer';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CourseDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const course = courses.find((c) => c.id === params.id);
    const [openVideo, setOpenVideo] = React.useState(false);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    if (!course) {
        return notFound();
    }

    const handleAddToCart = () => {
        if (!user) {
            router.push('/login');
            return;
        }
        addToCart({
            id: course.id,
            title: course.title,
            price: course.price,
            image: course.image,
        });
        setSnackbar({
            open: true,
            message: 'Course added to cart!',
            severity: 'success',
        });
    };

    const handleBuyNow = () => {
        if (!user) {
            router.push('/login');
            return;
        }
        handleAddToCart();
        router.push('/checkout');
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <Box>
            {/* Header Section */}
            <Box sx={{ bgcolor: 'grey.900', color: 'white', py: 8 }}>
                <Container maxWidth="lg">
                    <Grid container spacing={4}>
                        <Grid size={{ xs: 12, md: 8 }}>
                            <Box sx={{ mb: 2 }}>
                                <Chip label={course.category} color="primary" sx={{ mr: 2 }} />
                                <Typography component="span" variant="body2" sx={{ color: 'grey.400' }}>
                                    Last updated: December 2025
                                </Typography>
                            </Box>
                            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                                {course.title}
                            </Typography>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 400, color: 'grey.300' }}>
                                {course.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                                <Rating value={course.rating} precision={0.1} readOnly sx={{ color: 'gold' }} />
                                <Typography variant="body1" sx={{ ml: 1, color: 'gold', fontWeight: 700 }}>
                                    {course.rating}
                                </Typography>
                                <Typography variant="body2" sx={{ ml: 1, color: 'grey.400' }}>
                                    (1,234 ratings)
                                </Typography>
                            </Box>
                            <Typography variant="body2" sx={{ color: 'white' }}>
                                Created by <Box component="span" sx={{ color: 'primary.light', textDecoration: 'underline' }}>John Doe</Box>
                            </Typography>
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Content Section */}
            <Container maxWidth="lg" sx={{ py: 8 }}>
                <Grid container spacing={6}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Box sx={{ mb: 6 }}>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                                What you&apos;ll learn
                            </Typography>
                            <Grid container spacing={2}>
                                {[1, 2, 3, 4].map((item) => (
                                    <Grid key={item} size={{ xs: 12, sm: 6 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                            <CheckCircleIcon color="success" sx={{ mr: 1, mt: 0.5 }} />
                                            <Typography variant="body1">
                                                Master the fundamental concepts and advanced techniques.
                                            </Typography>
                                        </Box>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                        <Box>
                            <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                                Course Content
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                10 sections • 45 lectures • 12h 30m total length
                            </Typography>
                        </Box>
                    </Grid>

                    {/* Sidebar / Floating Card */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box sx={{
                            position: 'sticky',
                            top: 100,
                            bgcolor: 'background.paper',
                            boxShadow: 4,
                            borderRadius: 4,
                            overflow: 'hidden',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}>
                            <Box sx={{ position: 'relative', cursor: 'pointer' }} onClick={() => setOpenVideo(true)}>
                                <Box
                                    component="img"
                                    src={course.image}
                                    alt={course.title}
                                    sx={{ width: '100%', height: 200, objectFit: 'cover' }}
                                />
                                <Box sx={{
                                    position: 'absolute',
                                    top: 0, left: 0, right: 0, bottom: 0,
                                    bgcolor: 'rgba(0,0,0,0.4)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    transition: 'background 0.2s',
                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.2)' }
                                }}>
                                    <PlayCircleOutlineIcon sx={{ fontSize: 64, color: 'white' }} />
                                </Box>
                                <Typography sx={{
                                    position: 'absolute',
                                    bottom: 16,
                                    left: 0,
                                    right: 0,
                                    textAlign: 'center',
                                    color: 'white',
                                    fontWeight: 600,
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                                }}>
                                    Preview this course
                                </Typography>
                            </Box>
                            <Box sx={{ p: 3 }}>
                                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                                    {course.price}
                                </Typography>
                                <Button
                                    variant="contained"
                                    fullWidth
                                    size="large"
                                    sx={{ mb: 2 }}
                                    onClick={handleAddToCart}
                                >
                                    Add to Cart
                                </Button>
                                <Button
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    onClick={handleBuyNow}
                                >
                                    Buy Now
                                </Button>
                                <Typography variant="body2" align="center" sx={{ mt: 2, color: 'text.secondary' }}>
                                    30-Day Money-Back Guarantee
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            <VideoPlayer
                open={openVideo}
                onClose={() => setOpenVideo(false)}
                videoUrl={course.videoUrl}
            />

            <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}
