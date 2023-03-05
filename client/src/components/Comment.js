import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Comment({comment, user, latestEdit}) {

    return (
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: '20vh' }}>
            <Typography variant="h6" gutterBottom>
                Posted By {user}
            </Typography>
            <Typography variant="body1" gutterBottom>
                {comment}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Last edited: {latestEdit}
            </Typography>
            </Box>
        </Container>
);
}