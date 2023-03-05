var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const session = require("express-session");
const config = require('./config/database');

// MongoDB
const mongoDB = config.database;
mongoose.set("strictQuery", true);
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

// Route variables
const userRouter = require("./routes/user");
const codeSnippetRouter = require("./routes/codeSnippet");
const commentRouter = require("./routes/comment");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express session
app.use(session({
    secret: config.secret,
    resave: true,
    saveUninitialized: true
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// Cors middleware
app.use(cors());

// Apply routes
app.use('/user', userRouter);
app.use('/snippets', codeSnippetRouter);
app.use('/comments', commentRouter);

module.exports = app;
