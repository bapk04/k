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

export default function ForgotPasswordPage() {
    const router = useRouter();
    const { resetPassword } = useAuth();
    const [step, setStep] = React.useState(1); // 1: Email, 2: New Password
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const handleEmailSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email) {
            setSnackbar({ open: true, message: 'Please enter your email', severity: 'error' });
            return;
        }
        // In a real app, we would verify email existence here via API.
        // For this mock, we'll assume valid if it's not empty and proceed to step 2.
        // Ideally we check if user exists in localStorage, but for security we might not want to reveal that.
        // However, for this UX, let's check.
        const usersStr = localStorage.getItem('users');
        const users = usersStr ? JSON.parse(usersStr) : [];
        const userExists = users.some((u: any) => u.email === email);

        if (userExists) {
            setSnackbar({ open: true, message: 'Email verified. Please enter new password.', severity: 'success' });
            setStep(2);
        } else {
            setSnackbar({ open: true, message: 'Email not found.', severity: 'error' });
        }
    };

    const handlePasswordSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!password || !confirmPassword) {
            setSnackbar({ open: true, message: 'Please fill in all fields', severity: 'error' });
            return;
        }
        if (password !== confirmPassword) {
            setSnackbar({ open: true, message: 'Passwords do not match', severity: 'error' });
            return;
        }

        const success = await resetPassword(email, password);
        if (success) {
            setSnackbar({ open: true, message: 'Password reset successful! Redirecting to login...', severity: 'success' });
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } else {
            setSnackbar({ open: true, message: 'Failed to reset password', severity: 'error' });
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
                    backgroundImage: 'url(https://source.unsplash.com/random/1600x900?nature)',
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
                        Account Recovery
                    </Typography>
                    <Typography variant="h6" align="center" sx={{ maxWidth: 600 }}>
                        Don't worry, we'll help you get back on track.
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
                        Forgot Password
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                        {step === 1 ? 'Enter your email to search for your account' : 'Enter your new password'}
                    </Typography>

                    {step === 1 ? (
                        <Box component="form" noValidate onSubmit={handleEmailSubmit} sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                size="large"
                                sx={{ mt: 3, mb: 2, py: 1.5, fontSize: '1.1rem' }}
                            >
                                Search
                            </Button>
                        </Box>
                    ) : (
                        <Box component="form" noValidate onSubmit={handlePasswordSubmit} sx={{ mt: 1, width: '100%' }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="New Password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm New Password"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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
                                Reset Password
                            </Button>
                        </Box>
                    )}

                    <Grid container justifyContent="flex-end">
                        <Grid>
                            <Link href="/login" style={{ textDecoration: 'none', color: '#2563eb' }}>
                                Back to Login
                            </Link>
                        </Grid>
                    </Grid>
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
