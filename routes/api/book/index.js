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

router.get("/:id", function(req, res) {
	const { id } = req.params;
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
