'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

export default function ContactPage() {
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        alert('Thank you for contacting us! We will get back to you soon.');
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Box sx={{ mb: 8, textAlign: 'center' }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
                    Contact Us
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </Typography>
            </Box>

            <Grid container spacing={6}>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Box sx={{ mb: 4 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                            Get in Touch
                        </Typography>
                        <Typography color="text.secondary" paragraph>
                            Fill out the form and our team will get back to you within 24 hours.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 3 }}>
                        <LocationOnIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Visit Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                10 , Ngô Sĩ Liên , Tây Nha Trang , Khánh Hòa
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 3 }}>
                        <PhoneIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Call Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                0935769306
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', mb: 3 }}>
                        <EmailIcon color="primary" sx={{ mr: 2, mt: 0.5 }} />
                        <Box>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Email Us
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ngogiakiet20012004@gmail.com
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                <Grid size={{ xs: 12, md: 7 }}>
                    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                        <Box component="form" onSubmit={handleSubmit} noValidate>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="First Name"
                                        name="firstName"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Last Name"
                                        name="lastName"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Message"
                                        name="message"
                                        multiline
                                        rows={4}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        sx={{ py: 1.5 }}
                                    >
                                        Send Message
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}
