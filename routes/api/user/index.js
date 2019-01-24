const express = require('express');
const router = express.Router();
const db = require("../../../db/models");

router.get("/find/:uid", (req,res) => {
    db.User.findOne({_id: req.params.uid})
    .populate([
        {path: 'saved'}, 
        {path: 'ignored'}
    ])
    .then((userRes) => {
        const userInfo = {
            firstName: userRes.firstName,
            lastName: userRes.lastName,
            photo: userRes.photo
        };
        res.json(userInfo);
    })
    .catch(function (err) {
        res.json(err);
    });
})

// Get user's saved books
router.get("/", (req,res) => {
    db.User.findOne({_id: req.user._id})
    .populate([
        {path: 'saved'}, 
        {path: 'ignored'}
    ])
    .then((userRes) => {
        const userInfo = {
            firstName: userRes.firstName,
            lastName: userRes.lastName,
            savedBooks: userRes.saved,
            ignoredBooks: userRes.ignored,
            photo: userRes.photo
        };
        res.json(userInfo);
    })
    .catch(function (err) {
        res.json(err);
    });
})

// Add books to user's saved book list
router.post('/saved/:bookId', (req, res) => {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { saved: req.params.bookId } }, { new: true })
      .catch(function (err) {
        res.json(err);
      });
  });

// Remove books from user's saved books list
router.delete('/saved/:bookId', (req, res, next) => {
    db.User.findOneAndUpdate({ _id: req.user._id }, { $pull: {saved: req.params.bookId}}, { new: true })
      .catch(function (err) {
        res.json(err);
      });
  });

module.exports = router;