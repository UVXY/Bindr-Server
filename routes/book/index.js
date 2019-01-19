const express = require('express')
const router = express.Router()
const db = require('../../db/models')

router.post('/saved/:uid', (req, res) => {
	db.Book.findOne({ _id: req.body.bookID}).then((book) => {
		return db.User.findOneAndUpdate({ _id: req.param.uid}, { $push: {saved: book._id}}, { new: true });
	})
	.catch(function(err) {
		console.log(err)
    res.json(err);
  });
})

router.post('/ignored/:uid', (req, res) => {
	db.Book.findOne({ _id: req.body.bookID}).then((book) => {
		return db.User.findOneAndUpdate({ _id: req.param.uid}, { $push: {ignored: book._id}}, { new: true });
	})
	.catch(function(err) {
		console.log(err)
    res.json(err);
  });
})

router.get("/book/:id", function(req, res) {
		db.Book.findOneAndUpdatefindOne({ _id: req.params.id })
		  // ..and populate all of the notes associated with it
		  .populate("comments")
		  .then(function(dbBook) {
			// If we were able to successfully find an Article with the given id, send it back to the client
			res.json(dbBook);
		  })
		  .catch(function(err) {
			// If an error occurred, send it to the client
			res.json(err);
		  });
	  });

module.exports = router
