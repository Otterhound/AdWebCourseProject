const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const config = require('../config/database');
const User = require('../models/user');
const CodeSnippet = require("../models/codeSnippet");
const Comment = require("../models/comment");

// Register
router.post('/register', async (req, res, next) => {
    let newUser = new User ({
        ...req.body
    });

    // Check if username has been taken
    let dublicateCheck = await User.findOne({username: newUser.username});
    if (dublicateCheck) {
        return res.json({success: false, msg: 'Username alredy in use'})
    }

    addUser(newUser, (err, user) => {
        if(err) {
            res.json({success: false, msg: 'Failed to register user', err: err});
        } else {
            res.json({success: true, msg: 'User registered'});
        }
    });
});

const addUser =  function(newUser, callback) {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

// User login
router.post('/login', async (req, res, next) => {
    const name = req.body.username;
    const password = req.body.password;

    // Check if user exits
    let user = await User.findOne({username: name});
    if (!user) {
        return res.json({success: false, msg: 'User not found'})
    }

    comparePassword(password, user.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch) {
            const token = jwt.sign({data: user}, config.secret, {
                expiresIn: 604800 // 1 week
            });
            res.json({
                success: true,
                token: 'JWT '+ token,
                user: user
        })
    } else {
        return res.json({success: false, msg: 'Wrong password'});
    }
});
});

comparePassword = function(candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}

// Log out
router.get("/logout", async (req, res) => {
    res.json({message: "User logout"});
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

// Get users snippets
router.get('/snippets', passport.authenticate('jwt', {session:false}), async (req, res) => {
    let user = await User.findOne({username: req.body.username});
    let snippets = await CodeSnippet.find({user: user._id});
    if (Object.keys(snippets).length === 0) {
        return res.json({success: false, msg: 'User has no snippets'});
    }
    else {
        return res.json({success: true, snippets});
    }
});

// Get users comments
router.get('/comments', passport.authenticate('jwt', {session:false}), async (req, res) => {
    let user = await User.findOne({username: req.body.username});
    let comments = await Comment.find({user: user._id});
    if (Object.keys(comments).length === 0) {
        return res.json({success: false, msg: 'User has no comments'});
    }
    else {
        return res.json({success: true, comments});
    }
});

module.exports = router;