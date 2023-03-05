import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

export default function Snippet({title, explanation, code, user, latestEdit}) {

    return (
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: '20vh' }}>
            <Typography variant="h6" gutterBottom>
                {title}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Explanation: {explanation}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Code: {code}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Posted by: {user}
            </Typography>
            <Typography variant="body1" gutterBottom>
                Last edited: {latestEdit}
            </Typography>
            </Box>
        </Container>
);
}