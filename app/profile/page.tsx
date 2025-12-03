'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, updateUser, loading } = useAuth();
    const router = useRouter();
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    React.useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        } else if (user) {
            setFormData((prev) => ({
                ...prev,
                name: user.name,
                email: user.email,
            }));
        }
    }, [user, loading, router]);

    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}><Typography>Loading...</Typography></Box>;
    }

    if (!user) {
        return null;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (formData.password && formData.password !== formData.confirmPassword) {
            setSnackbar({
                open: true,
                message: 'Passwords do not match',
                severity: 'error',
            });
            return;
        }

        const updatedUser = {
            ...user,
            name: formData.name,
            // Only update password if provided
            ...(formData.password ? { password: formData.password } : {}),
        };

        updateUser(updatedUser);
        setSnackbar({
            open: true,
            message: 'Profile updated successfully!',
            severity: 'success',
        });
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                My Profile
            </Typography>

            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ p: 4, textAlign: 'center', borderRadius: 4 }}>
                        <Avatar
                            sx={{ width: 120, height: 120, mx: 'auto', mb: 2, bgcolor: 'primary.main', fontSize: '3rem' }}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            {user.name}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" gutterBottom>
                            {user.email}
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box sx={{ textAlign: 'left' }}>
                            <Typography variant="subtitle1" fontWeight="bold">
                                Account Stats
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Current Plan: <strong>{user.plan || 'Free'}</strong>
                            </Typography>
                            <Button size="small" href="/pricing" sx={{ mb: 1, textTransform: 'none' }}>
                                Upgrade Plan
                            </Button>
                            <Typography variant="body2" color="text.secondary">
                                Enrolled Courses: {user.myCourses?.length || 0}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Member since: {new Date().getFullYear()}
                            </Typography>
                        </Box>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper elevation={2} sx={{ p: 4, borderRadius: 4 }}>
                        <Typography variant="h5" fontWeight="bold" gutterBottom>
                            Edit Profile
                        </Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        value={formData.email}
                                        disabled
                                        helperText="Email cannot be changed"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Divider sx={{ my: 1 }}>
                                        <Typography variant="caption" color="text.secondary">
                                            Change Password (Optional)
                                        </Typography>
                                    </Divider>
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="New Password"
                                        name="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <TextField
                                        fullWidth
                                        label="Confirm New Password"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{ mt: 2 }}
                                    >
                                        Save Changes
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Container>
    );
}
