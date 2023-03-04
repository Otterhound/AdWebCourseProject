const mongoose = require("mongoose");

const CodeSnippetSchema = mongoose.Schema ({
    title: {
        type: String,
        required: true
    },
    explanation: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    latestEdit: {
        type: Date,
        required: true
    }
});

const CodeSnippet = module.exports = mongoose.model('CodeSnippet', CodeSnippetSchema);