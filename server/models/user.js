const mongoose = require("mongoose");

const UserSchema = mongoose.Schema ({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    registerdate: {
        type: Date,
        required: true
    },
    bio: {
        type: String,
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
