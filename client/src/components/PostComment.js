import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";

export default function PostComment() {

    let navigate = useNavigate();

    /*
    Gets JWT token from cookies,
    gets user profile information,
    then posts users comment,
    navigates to snippet page
    */
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
    const snippedId = document.cookie
        .split("; ")
        .find((row) => row.startsWith("clickedId"))
        ?.split("=")[1];
        try {
        let res = await fetch('http://localhost:1234/comments/add', {
            method: "POST",
            headers: myheaders,
            body: JSON.stringify({
            comment: e.target.elements.commentfield.value,
            username: userJson.user.username,
            user: userJson.user._id,
            codeSnippet: snippedId,
            latestEdit: postdate
        })
    });
    let resJson = await res.json();
    console.log(resJson);
    navigate("/snippet");
} catch (err) {
    console.log(err);
}
};

    return (
    <div>
        <Box component="form" onSubmit={handlePost} sx={{'& > :not(style)': { m: 1, width: '25ch' },}} noValidate autoComplete="off">
            <TextField id="commentfield" label="Comment" variant="standard" />
            <Button type='submit' variant="contained">Post comment</Button>
        </Box>
    </div>
    );
}