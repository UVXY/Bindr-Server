const express = require('express')
const router = express.Router()
const db = require('../../db/models')

// router.get('/recipe/:id', (req, res, next) => {
// 	console.log('===== user!!======')
// 	const id = req.params.id;
// 	Book.findOne({
// 		'_id': id
// 	}, (err, bookMatch) => {
// 		if (bookMatch) {
// 			res.json(bookMatch)
// 		}else{
// 			res.json({"ERROR": "NO MATCH"})
// 		}
// 	})
// })

router.post('/book/:id', (req, res) => {
	// console.log("REQ.BODY: ", req.body)
	// console.log("USER ID", req.params.id)
	db.Book.create(req.body).then((book) => {

		return db.User.findOneAndUpdate({ _id: req.params.id }, { $push: {book: book._id }}, { new: true });
    })
    .then(function(dbUser) {
	  // If we were able to successfully update an Article, send it back to the client
	  console.log('USER OBJECT UPDATED')
      res.json(dbUser);
    })
    .catch(function(err) {
		console.log(err)
      // If an error occurred, send it to the client
      res.json(err);
    });

	})

router.get("/book/:id", function(req, res) {
		// Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
		db.User.findOne({ _id: req.params.id })
		  // ..and populate all of the notes associated with it
		  .populate("book")
		  .then(function(dbUser) {
			// If we were able to successfully find an Article with the given id, send it back to the client
			res.json(dbUser);
		  })
		  .catch(function(err) {
			// If an error occurred, send it to the client
			res.json(err);
		  });
	  });

module.exports = router
