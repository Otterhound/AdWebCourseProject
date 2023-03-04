const express = require('express');
const router = express.Router();
const passport = require('passport');
const Comment = require("../models/comment");

// Create CodeSnippet
router.post("/add", passport.authenticate('jwt', {session:false}) ,async (req, res) => {
    let newComment = new Comment({
        ...req.body
    });
    try {
        const comment = await newComment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Edit CodeSnippet
router.patch("/edit", passport.authenticate('jwt', {session:false}) ,async (req, res) => {
    try {
        await Comment.findByIdAndUpdate(req.body._id, req.body, { new: true }).then((comment) => {
            if (!comment) {
                return res.status(404).json({ message: "Comment not found" });
            }
            res.json(comment);
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete CodeSnippet 
router.delete('/delete', passport.authenticate('jwt', {session:false}) ,async (req, res) => {
    let info;
    try {
        info = await Comment.deleteOne({_id: req.body._id});
        res.json({info});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// Get Comments
router.get('/comments', async (req, res) => {
    let comments = await Comment.find();
    if (Object.keys(comments).length === 0) {
        return res.json({success: false, msg: 'No saved comments'});
    }
    else {
        return res.json({success: true, comments});
    }
});
module.exports = router;