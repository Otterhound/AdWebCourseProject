const express = require('express');
const router = express.Router();
const passport = require('passport');
const CodeSnippet = require("../models/codeSnippet");
const Comment = require("../models/comment");

// Create CodeSnippet
router.post("/add", passport.authenticate('jwt', {session:false}) ,async (req, res) => {
    let newCodeSnippet = new CodeSnippet({
        ...req.body
    });
    try {
        const codeSnippet = await newCodeSnippet.save();
        res.status(201).json(newCodeSnippet);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit CodeSnippet
router.patch("/edit", passport.authenticate('jwt', {session:false}) ,async (req, res) => {
    try {
        await CodeSnippet.findByIdAndUpdate(req.body._id, req.body, { new: true }).then((snippet) => {
            if (!snippet) {
                return res.status(404).json({ message: "Snippet not found" });
            }
            res.json(snippet);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete CodeSnippet 
router.delete('/delete', passport.authenticate('jwt', {session:false}) ,async (req, res) => {
    let info;
    try {
        info = await CodeSnippet.deleteOne({_id: req.body._id});
        res.json({info});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get CodeSnippets
router.get('/codeSnippets', async (req, res) => {
    let snippets = await CodeSnippet.find();
    if (Object.keys(snippets).length === 0) {
        return res.json({success: false, msg: 'No saved snippets'});
    }
    else {
        return res.json({success: true, snippets});
    }
});

// Get snippets comments
router.get('/comments', passport.authenticate('jwt', {session:false}), async (req, res) => {
    let snippet = await CodeSnippet.findOne({_id: req.body._id});
    let comments = await Comment.find({codeSnippet: snippet._id});
    if (Object.keys(comments).length === 0) {
        return res.json({success: false, msg: 'Snippet has no comments'});
    }
    else {
        return res.json({success: true, comments});
    }
});

module.exports = router;