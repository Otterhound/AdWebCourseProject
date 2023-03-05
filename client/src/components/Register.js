import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export default function Register() {

    let navigate = useNavigate();

    // Sends user profile information to server, and creates new user account
    const handleRegister = async (e) => {
        e.preventDefault();
        let registerdate = new Date();
        let myheaders = new Headers();
        myheaders.append('Content-Type', 'application/json')
        try {
        let res = await fetch('http://localhost:1234/user/register', {
            method: "POST",
            headers: myheaders,
            body: JSON.stringify({
            username: e.target.elements.usernamefield.value,
            password: e.target.elements.passwordfield.value,
            bio: e.target.elements.biofield.value,
            registerdate: registerdate,
        })
    });
    let resJson = await res.json();
    if (res.status === 200) {
        console.log(resJson);
        navigate("/login");
    }
} catch (err) {
    console.log(err);
}
};

    return (
    <div>
        <Box component="form" onSubmit={handleRegister} sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
            <TextField id="usernamefield" label="Username" variant="standard" />
            <TextField id="passwordfield" label="Password" variant="standard" />
            <TextField id="biofield" label="Bio" variant="standard" />
            <Button type='submit' variant="contained">Register</Button>
        </Box>
    </div>
    );
}