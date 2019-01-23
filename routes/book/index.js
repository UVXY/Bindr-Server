const express = require('express');

const router = express.Router();
const db = require('../../db/models');

// Get recommendations
router.get('/book/recommendations', function (req, res) {
  db.Book.find({}, function (err, docs) {
    if (!err) {
      res.json(docs);
    } else { throw err; }
  });
});

router.get('/book/:id', function (req, res) {
  db.Book.findOneAndUpdate({ _id: req.params.id })
  // ..and populate all of the notes associated with it
    .populate('comments')
    .then(function (dbBook) {
      // If we were able to successfully find an Article with the given id, send it back to the client
      res.json(dbBook);
    })
    .catch(function (err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
});

module.exports = router;
