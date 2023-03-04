var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require('passport');
const session = require("express-session");
const config = require('./config/database');

const mongoDB = config.database;
mongoose.set("strictQuery", true);
mongoose.connect(mongoDB);
mongoose.Promise = Promise;
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

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

app.use('/users', userRouter);
app.use('/snippets', codeSnippetRouter);
app.use('/comments', commentRouter);

// Ponder if delete this 
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.resolve("..", "client", "build")));
    app.get("*", (req, res) =>
        res.sendFile(path.resolve("..", "client", "build", "index"))
    );
} else if (process.env.NODE_ENV === "development") {
    var corsOptions = {
        origin: "http://localhost:3000",
        optionsSuccessStatus: 200,
    };
    app.use(cors(corsOptions));
}

module.exports = app;
