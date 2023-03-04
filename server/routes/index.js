var express = require('express');
var router = express.Router();
const Book = require("../models/book");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/api/book', async function(req, res) {
  const book = new Book({
    name: req.body.name,
    author: req.body.author,
    pages: req.body.pages
  });
  try {
    const newBook = await book.save();
    res.status(200).json(newBook);
  } catch (err) {
    res.status(400).json({message: err.message})};
});

module.exports = router;
