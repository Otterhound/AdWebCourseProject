const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema ({
    comment: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    codeSnippet: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    latestEdit: {
        type: Date,
        required: true
    }
});

const Comment = module.exports = mongoose.model('Comment', CommentSchema);