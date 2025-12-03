'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';

const tiers = [
    {
        title: 'Free',
        price: '0',
        description: [
            'Access to 10 free courses',
            'Community support',
            'Basic video quality',
            'Ad-supported',
        ],
        buttonText: 'Sign up for free',
        buttonVariant: 'outlined',
    },
    {
        title: 'Pro',
        subheader: 'Most Popular',
        price: '15',
        description: [
            'Unlimited access to all courses',
            'Priority email support',
            'HD video quality',
            'Ad-free experience',
            'Certificate of completion',
        ],
        buttonText: 'Get started',
        buttonVariant: 'contained',
    },
    {
        title: 'Enterprise',
        price: '30',
        description: [
            'Everything in Pro',
            'Team management',
            'Dedicated account manager',
            'Custom learning paths',
            'API access',
        ],
        buttonText: 'Contact us',
        buttonVariant: 'outlined',
    },
];

export default function PricingPage() {
    return (
        <Container maxWidth="lg" component="main" sx={{ py: 8 }}>
            <Box sx={{ textAlign: 'center', mb: 8 }}>
                <Typography component="h1" variant="h2" color="text.primary" gutterBottom fontWeight="bold">
                    Pricing Plans
                </Typography>
                <Typography variant="h5" color="text.secondary" component="p" sx={{ maxWidth: 600, mx: 'auto' }}>
                    Choose the perfect plan for your learning journey. Upgrade anytime as you grow.
                </Typography>
            </Box>

            <Grid container spacing={4} alignItems="flex-end">
                {tiers.map((tier) => (
                    <Grid
                        key={tier.title}
                        size={{ xs: 12, sm: tier.title === 'Enterprise' ? 12 : 6, md: 4 }}
                    >
                        <Card sx={{ borderRadius: 4, position: 'relative', overflow: 'visible' }}>
                            <CardHeader
                                title={tier.title}
                                subheader={tier.subheader}
                                titleTypographyProps={{ align: 'center', fontWeight: 'bold' }}
                                subheaderTypographyProps={{
                                    align: 'center',
                                }}
                                action={tier.title === 'Pro' ? <StarIcon /> : null}
                                sx={{
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'light'
                                            ? theme.palette.grey[200]
                                            : theme.palette.grey[700],
                                }}
                            />
                            <CardContent>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'baseline',
                                        mb: 2,
                                    }}
                                >
                                    <Typography component="h2" variant="h3" color="text.primary">
                                        ${tier.price}
                                    </Typography>
                                    <Typography variant="h6" color="text.secondary">
                                        /mo
                                    </Typography>
                                </Box>
                                <ul>
                                    {tier.description.map((line) => (
                                        <Typography
                                            component="li"
                                            variant="subtitle1"
                                            align="center"
                                            key={line}
                                            sx={{ listStyle: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}
                                        >
                                            <CheckIcon color="primary" fontSize="small" /> {line}
                                        </Typography>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardActions>
                                <Button
                                    fullWidth
                                    variant={tier.buttonVariant as 'outlined' | 'contained'}
                                    href={tier.title === 'Free' ? '/register' : '/register'}
                                    size="large"
                                >
                                    {tier.buttonText}
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
