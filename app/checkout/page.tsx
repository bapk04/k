'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const { user, updateUser } = useAuth();
    const router = useRouter();
    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });

    const total = cartItems.reduce((acc, item) => {
        const price = parseFloat(item.price.replace('$', ''));
        return acc + price;
    }, 0);

    const handleCheckout = () => {
        if (!user) {
            router.push('/login');
            return;
        }

        // Add items to user's myCourses
        const currentMyCourses = user.myCourses || [];
        // Filter out duplicates if any
        const newCourses = cartItems.filter(
            (item) => !currentMyCourses.some((c) => c.id === item.id)
        );

        const updatedUser = {
            ...user,
            myCourses: [...currentMyCourses, ...newCourses],
        };

        updateUser(updatedUser);

        setSnackbar({
            open: true,
            message: 'Order placed successfully! Redirecting to My Courses...',
            severity: 'success',
        });
        clearCart();
        setTimeout(() => {
            router.push('/my-courses');
        }, 2000);
    };

    const handleCloseSnackbar = () => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    };

    if (cartItems.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h4" gutterBottom>
                    Your cart is empty
                </Typography>
                <Button variant="contained" href="/courses" sx={{ mt: 2 }}>
                    Browse Courses
                </Button>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 8 }}>
            <Typography variant="h3" gutterBottom sx={{ fontWeight: 700, mb: 4 }}>
                Shopping Cart
            </Typography>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            {cartItems.length} Course{cartItems.length > 1 ? 's' : ''} in Cart
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        {cartItems.map((item) => (
                            <Box key={item.id} sx={{ display: 'flex', mb: 3, alignItems: 'center' }}>
                                <Box
                                    component="img"
                                    src={item.image}
                                    alt={item.title}
                                    sx={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 2, mr: 2 }}
                                />
                                <Box sx={{ flexGrow: 1 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                        {item.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        By John Doe
                                    </Typography>
                                </Box>
                                <Box sx={{ textAlign: 'right', ml: 2 }}>
                                    <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                                        {item.price}
                                    </Typography>
                                    <IconButton onClick={() => removeFromCart(item.id)} color="error" size="small">
                                        <DeleteOutlineIcon />
                                    </IconButton>
                                </Box>
                            </Box>
                        ))}
                    </Paper>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper elevation={2} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 700 }}>
                            Total:
                        </Typography>
                        <Typography variant="h3" color="primary" sx={{ fontWeight: 800, mb: 3 }}>
                            ${total.toFixed(2)}
                        </Typography>
                        <Button
                            variant="contained"
                            fullWidth
                            size="large"
                            onClick={handleCheckout}
                            sx={{ py: 1.5, fontSize: '1.1rem' }}
                        >
                            Checkout
                        </Button>
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 2, textAlign: 'center' }}>
                            Secure Checkout
                        </Typography>
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
