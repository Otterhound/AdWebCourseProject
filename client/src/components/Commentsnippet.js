import * as React from 'react';
import Container from '@mui/material/Container';
import Snippet from './Snippest';
import Comment from './Comment';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function SnippedAndComment() {

    let navigate = useNavigate();

    const [listItems, setListItems] = useState([]);

    // Gets snippet title from cookies
    const title = document.cookie
        .split("; ")
        .find((row) => row.startsWith("clickedTitle"))
        ?.split("=")[1];

    // Gets snippet explanation from cookies
    const explanation = document.cookie
        .split("; ")
        .find((row) => row.startsWith("clickedExplanation"))
        ?.split("=")[1];

    // Gets snippet code from cookies
    const code = document.cookie
        .split("; ")
        .find((row) => row.startsWith("clickedCode"))
        ?.split("=")[1];

    // Gets snippet user from cookies
    const user = document.cookie
        .split("; ")
        .find((row) => row.startsWith("clickedUser"))
        ?.split("=")[1];

    // Gets snippet latest edited time from cookies
    const latestEdit = document.cookie
        .split("; ")
        .find((row) => row.startsWith("clickedlatestEdit"))
        ?.split("=")[1];

    // Loads all comments on a post
    const loadComments = async () => {
        try {
        const id = document.cookie
        .split("; ")
        .find((row) => row.startsWith("clickedId"))
        ?.split("=")[1];
        const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("webprojecttoken"))
        ?.split("=")[1];
        let myheaders = new Headers();
        myheaders.append('Content-Type', 'application/json');
        myheaders.append("Authorization", token);
        let res = await fetch('http://localhost:1234/snippets/comments?id='+id, {
            method: "GET",
            headers: myheaders
    });
    let resJson = await res.json();
    if (res.status === 200) {
        // Creates list of comment components
        const list = resJson.comments.map((c) => <li key={c._id} ><Comment 
        comment={c.comment}
        user={c.username}
        latestEdit={c.latestEdit}
        ></Comment>
        </li>);
        setListItems(list)
    }
} catch (err) {
    console.log(err);
}
    }

    /* 
    Checks if user has been authorized,
    if yes navigates to comment post page,
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
            navigate("/comment");
        }
    }

    return (
        <Container maxWidth="sm">
            <Button onClick={checkIfLogIn} color="inherit">Comment</Button>
            <Button onClick={loadComments} color="inherit">Load Comments</Button>
            <Snippet 
            title={title}
            explanation={explanation}
            code={code}
            user={user}
            latestEdit={latestEdit}
            ></Snippet>
            <ol> {listItems} </ol>
        </Container>
);
}