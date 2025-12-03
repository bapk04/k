'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

interface VideoPlayerProps {
    open: boolean;
    onClose: () => void;
    videoUrl: string;
}

export default function VideoPlayer({ open, onClose, videoUrl }: VideoPlayerProps) {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="video-preview-modal"
            aria-describedby="video-preview-description"
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
            <Box sx={{
                position: 'relative',
                width: '90%',
                maxWidth: 900,
                bgcolor: 'black',
                boxShadow: 24,
                p: 0,
                outline: 'none',
                aspectRatio: '16/9',
            }}>
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        top: -40,
                        right: -40,
                        color: 'white',
                        bgcolor: 'rgba(0,0,0,0.5)',
                        '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <iframe
                    width="100%"
                    height="100%"
                    src={videoUrl}
                    title="Course Preview"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </Box>
        </Modal>
    );
}
