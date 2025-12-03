'use client';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions, Chip, Box } from '@mui/material';
import Link from 'next/link';
import StarIcon from '@mui/icons-material/Star';

interface CourseCardProps {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    rating: number;
    price: string;
}

export default function CourseCard({ id, title, description, image, category, rating, price }: CourseCardProps) {
    return (
        <Card sx={{ maxWidth: 345, height: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
            <CardActionArea component={Link} href={`/courses/${id}`}>
                <CardMedia
                    component="img"
                    height="180"
                    image={image}
                    alt={title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Chip label={category} size="small" color="primary" variant="outlined" />
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <StarIcon sx={{ color: 'gold', fontSize: 16, mr: 0.5 }} />
                            <Typography variant="body2" color="text.secondary">
                                {rating}
                            </Typography>
                        </Box>
                    </Box>
                    <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 700, lineHeight: 1.2, mb: 1 }}>
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}>
                        {description}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                <Typography variant="h6" color="primary" sx={{ fontWeight: 700 }}>
                    {price}
                </Typography>
                <Button size="small" variant="contained" component={Link} href={`/courses/${id}`}>
                    Enroll Now
                </Button>
            </CardActions>
        </Card>
    );
}
