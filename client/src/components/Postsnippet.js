import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export default function Post() {

    let navigate = useNavigate();

    const handlePost = async (e) => {
        e.preventDefault();
        let userJson;
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("webprojecttoken"))
        ?.split("=")[1];
        let myheaders = new Headers();
        myheaders.append("Authorization", token);
        myheaders.append('Content-Type', 'application/json');
        try {
            let profileres = await fetch('http://localhost:1234/user/profile', {
            method: "GET",
            headers: myheaders,
        });
        userJson = await profileres.json();
    } catch (err) {
        console.log(err);
    }
    let postdate = new Date();
        try {
        let res = await fetch('http://localhost:1234/snippets/add', {
            method: "POST",
            headers: myheaders,
            body: JSON.stringify({
            title: e.target.elements.titlefield.value,
            explanation: e.target.elements.explanationfield.value,
            code: e.target.elements.codefield.value,
            user: userJson.user._id,
            latestEdit: postdate
        })
    });
    let resJson = await res.json();
    console.log(resJson);
    navigate("/");
} catch (err) {
    console.log(err);
}
};

    return (
    <div>
        <Box component="form" onSubmit={handlePost} sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
            <TextField id="titlefield" label="Title" variant="standard" />
            <TextField id="explanationfield" label="Explanation" variant="standard" />
            <TextField id="codefield" label="Code" variant="standard" />
            <Button type='submit' variant="contained">Post</Button>
        </Box>
    </div>
    );
}