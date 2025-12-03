'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Link from 'next/link';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import InputAdornment from '@mui/material/InputAdornment';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
    });
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!formData.email || !formData.password) {
            setSnackbar({
                open: true,
                message: 'Please fill in all fields',
                severity: 'error',
            });
            return;
        }

        const success = await login(formData.email, formData.password);

        if (success) {
            setSnackbar({
                open: true,
                message: 'Login successful! Redirecting...',
                severity: 'success',
            });
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } else {
            setSnackbar({
                open: true,
                message: 'Invalid email or password',
                severity: 'error',
            });
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                size={{ xs: false, sm: 4, md: 7 }}
                sx={{
                    backgroundImage: 'url(https://source.unsplash.com/random/1600x900?office)',
                    backgroundRepeat: 'no-repeat',
                    backgroundColor: (t) =>
                        t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    position: 'relative',
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(37, 99, 235, 0.8)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        color: 'white',
                        p: 4,
                    }}
                >
                    <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
                        Welcome Back
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ maxWidth: 600 }}>
                        Continue your learning journey with us.
                    </Typography>
                </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 8, md: 5 }} component={Paper} elevation={6} square sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        maxWidth: 400,
                        width: '100%',
                    }}
                >
                    <Typography component="h1" variant="h4" fontWeight="bold" gutterBottom>
                        Sign In
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        Access your account
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            value={formData.email}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailOutlinedIcon color="action" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            slotProps={{
                                input: {
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockOutlinedIcon color="action" />
                                        </InputAdornment>
                                    ),
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            size="large"
                            sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                        >
                            Sign In
                        </Button>
                        <Grid container justifyContent="space-between">
                            <Grid>
                                <Link href="/forgot-password" style={{ textDecoration: 'none', color: '#2563eb' }}>
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid>
                                <Link href="/register" style={{ textDecoration: 'none', color: '#2563eb' }}>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Grid>
    );
}
