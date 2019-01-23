const express = require('express');

const router = express.Router();
const db = require('../../db/models');

// Add books to user's saved books list
router.post('/user/saved/:bookId', (req, res) => {
  db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { saved: req.params.bookId } }, { new: true })
    .catch(function (err) {
      res.json(err);
    });
});

// Remove books from user's saved books list
router.delete('/user/saved/:bookId', (req, res, next) => {
  db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: {saved: req.params.bookId}}, { new: true })
    .catch(function (err) {
      res.json(err);
    });
});

// Ignore books so they won't be recommended again
router.post('/user/ignored/:bookId', (req, res) => {
  db.Book.findOne({ _id: req.body.bookID }).then((book) => db.User.findOneAndUpdate({ _id: req.params.uid}, { $push: {ignored: book._id}}, { new: true }))
    .catch(function (err) {
      res.json(err);
    });
});

// Get user's saved books
router.get('/user/myBooks', function (req, res) {
  db.User.findOne({ _id: req.user._id })
    .populate('saved')
    .then(function (dbUserBooks) {
      res.json(dbUserBooks);
    })
    .catch(function (err) {
      res.json(err);
    });
});

module.exports = router;
