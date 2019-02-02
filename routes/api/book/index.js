const express = require('express');
const router = express.Router();
const db = require('../../../db/models');

router.get('/recommendations', function (req, res) {
	db.Book.find({})
	.populate("comments")
	.then(dbRes => {
		res.json(dbRes);
	});
});

router.post('/ignore', (req, res) => {
	db.Book.findOne({ _id: req.body.bookID}).then((book) => {
		return db.User.findOneAndUpdate(
			{ _id: req.user._id}, 
			{ $push: {ignored: book._id}}, 
			{ new: true });
	})
	.catch(function(err) {
    res.json(err);
  });
})

router.get("/", function(req, res) {
	const id = req.body.id;
	db.Book.find({ _id: id })
	.populate("comments")
	.then(function(dbBook) {
		res.json(dbBook);
	})
	.catch(function(err) {
		res.json(err);
	});
});

module.exports = router;
