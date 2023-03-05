import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useState } from 'react';

export default function Profile() {

    const [username, setUsername] = useState([]);
    const [bio, setbio] = useState([]);
    const [registerdate, setRegisterDate] = useState([]);

    // Gets user profile information from server
    const loadProfile = async () => {
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("webprojecttoken"))
        ?.split("=")[1];
        let myheaders = new Headers();
        myheaders.append("Authorization", token);
        try {
        let res = await fetch('http://localhost:1234/user/profile', {
            method: "GET",
            headers: myheaders,
    });
    let resJson = await res.json();
    if (res.status === 200) {
        console.log(resJson);
        setUsername(resJson.user.username);
        setbio(resJson.user.bio);
        setRegisterDate(resJson.user.registerdate);
    }
} catch (err) {
    console.log(err);
}
};

    return (
    <React.Fragment>
        <CssBaseline />
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: '#cfe8fc', height: '100vh' }}>
            <Button onClick={loadProfile} color="inherit">Show profile</Button>
            <Typography variant="h5" gutterBottom>
                Username: {username}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Bio: {bio}
            </Typography>
            <Typography variant="h5" gutterBottom>
                Registerdate: {registerdate}
            </Typography>
            </Box>
        </Container>
    </React.Fragment>
);
}