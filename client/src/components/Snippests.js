import * as React from 'react';
import Container from '@mui/material/Container';
import Snippet from './Snippest';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Snippets() {

    let navigate = useNavigate();

    const [listItems, setListItems] = useState([]);

    /*
    Gets posted snippets from server,
    Incase if snipped list item is clicked,
    stores item information to browser cookies,
    and navigates to snipped page
    */
    const loadPosts = async () => {
        try {
        let res = await fetch('http://localhost:1234/snippets/codeSnippets', {
            method: "GET"
    });
    let resJson = await res.json();
    if (res.status === 200) {
        // Creates list of snippets
        const list = resJson.snippets.map((s) => <li key={s._id} onClick={() => {
            document.cookie = "clickedId=" + s._id;
            document.cookie = "clickedTitle=" + s.title;
            document.cookie = "clickedExplanation=" + s.explanation;
            document.cookie = "clickedCode=" + s.code;
            document.cookie = "clickedUser=" + s.user;
            document.cookie = "clickedlatestEdit=" + s.latestEdit;
            navigate("/snippet");
        }} ><Snippet 
        title={s.title}
        explanation={s.explanation}
        code={s.code}
        user={s.user}
        latestEdit={s.latestEdit}
        ></Snippet>
        </li>);
        setListItems(list)
    }
} catch (err) {
    console.log(err);
}
    }

    /* 
    Checks if user has been authorized,
    if yes navigates to snipped post page,
    if no navigates to home page
    */
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
            navigate("/post");
        }
    }

    return (
        <Container maxWidth="sm">
            <Button onClick={checkIfLogIn} color="inherit">Post</Button>
            <Button onClick={loadPosts} color="inherit">Load posts</Button>
            <ol> {listItems} </ol>
        </Container>
);
}