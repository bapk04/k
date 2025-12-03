'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

export default function Footer() {
    return (
        <Box
            component="footer"
            sx={{
                py: 6,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) => theme.palette.grey[50],
                borderTop: '1px solid',
                borderColor: 'divider',
            }}
        >
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="space-between">
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="h6" color="text.primary" gutterBottom fontWeight="bold">
                            CourseOnline
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Empowering learners worldwide with premium online courses.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 2 }}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight="bold">
                            Platform
                        </Typography>
                        <Link href="/courses" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
                            Browse Courses
                        </Link>
                        <Link href="/pricing" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
                            Pricing
                        </Link>
                    </Grid>
                    <Grid size={{ xs: 6, sm: 2 }}>
                        <Typography variant="subtitle1" color="text.primary" gutterBottom fontWeight="bold">
                            Company
                        </Typography>
                        <Link href="/about" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
                            About Us
                        </Link>
                        <Link href="/contact" color="text.secondary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
                            Contact
                        </Link>
                    </Grid>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography variant="body2" color="text.secondary" align="center">
                            {'Copyright © '}
                            <Link color="inherit" href="/">
                                CourseOnline
                            </Link>{' '}
                            {new Date().getFullYear()}
                            {'.'}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}
