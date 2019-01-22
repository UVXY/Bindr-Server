const express = require('express')
const router = express.Router()
const db = require('../../db/models')

router.post('/save', (req, res) => {
	db.Book.findOne({ _id: req.body.bookID}).then((book) => {
		return db.User.findOneAndUpdate({ _id: req.body.uid}, { $push: {saved: book._id}}, { new: true });
	})
	.catch(function(err) {
		console.log(err)
    res.json(err);
  });
})

router.post('/ignore', (req, res) => {
	db.Book.findOne({ _id: req.body.bookID}).then((book) => {
		return db.User.findOneAndUpdate({ _id: req.body.uid}, { $push: {ignored: book._id}}, { new: true });
	})
	.catch(function(err) {
		console.log(err)
    res.json(err);
  });
})

router.get("/", function(req, res) {
	db.Book.findOneAndUpdatefindOne({ _id: req.body.id })
	.populate("comments")
	.then(function(dbBook) {
		res.json(dbBook);
	})
	.catch(function(err) {
		res.json(err);
	});
});

module.exports = router;
