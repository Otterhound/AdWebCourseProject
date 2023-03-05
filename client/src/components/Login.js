import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export default function LogIn() {

    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        let myheaders = new Headers();
        myheaders.append('Content-Type', 'application/json');
        try {
        let res = await fetch('http://localhost:1234/user/login', {
            method: "POST",
            headers: myheaders,
            body: JSON.stringify({
            username: e.target.elements.usernamefield.value,
            password: e.target.elements.passwordfield.value
        })
    });
    let resJson = await res.json();
    if (res.status === 200) {
        console.log(resJson);
        const cookie = "webprojecttoken=" + resJson.token;
        document.cookie = cookie;
        navigate("/");
    }
} catch (err) {
    console.log(err);
}
};

    return (
    <div>
        <Box component="form" onSubmit={handleLogin} sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
            <TextField id="usernamefield" label="Username" variant="standard" />
            <TextField id="passwordfield" label="Password" variant="standard" />
            <Button type='submit' variant="contained">Log in</Button>
        </Box>
    </div>
    );
}