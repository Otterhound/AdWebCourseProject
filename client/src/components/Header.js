import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate} from 'react-router-dom';

const Header = () => {

    let navigate = useNavigate();

    const logOut = async (e) => {
        e.preventDefault();
        try {
        let res = await fetch('http://localhost:1234/user/logout', {
            method: "GET",
        });
        let resJson = await res.json();
    if (res.status === 200) {
        console.log(resJson);
        const cookie = "webprojecttoken=0";
        document.cookie = cookie;
        navigate("/");
    }
    } catch (err) {
        console.log(err);
    }
    };

    const checkIfLogIn = async () => {
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("webprojecttoken"))
        ?.split("=")[1];
        let myheaders = new Headers();
        myheaders.append("Authorization", token);
        let res = await fetch('http://localhost:1234/user/profile', {
            method: "GET",
            headers: myheaders
        });
        if (res.status === 401) {
            navigate("/");
        }
        if (res.status === 200) {
            navigate("/profile");
        }
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            </Typography>
            <Button component={Link} to="/" color="inherit">HOME</Button>
            <Button component={Link} to="/register" color="inherit">REGISTER</Button>
            <Button component={Link} to="/login" color="inherit">LOG IN</Button>
            <Button onClick={logOut} color="inherit">LOG OUT</Button>
            <Button onClick={checkIfLogIn} color="inherit">PROFILE</Button>
            </Toolbar>
        </AppBar>
        </Box>
    );
}

export default Header;