const express = require('express');
const router = express.Router();
const db = require("../../../db/models");

router.put("/:tag", (req, res) => {
  db.List.findOne({_id: req.body.listId}, (listRes) => {
    return db.Tag.findOneAndUpdate(
      {tagName: req.params.tag}, 
      {$push: {lists: listRes._id}}, 
      {new: true }
    );
  })
  .catch(function(err) {
    res.json(err);
  });
})

router.get("/:tag", (req, res) => {
  db.Tag.findOne({tagName: req.params.tag})
  .then((tagRes) => {
    const listsArray = [];
    tagRes.lists.forEach(list => {
      const bookList = [];
      db.List.findOne({_id: list})
      .populate("books")
      .then(dbListRes => {
        dbListRes.books.forEach(book => {
          bookList.push(book);
        });
        listsArray.push(bookList);
      });
    });
    return listsArray;
  }).then(finalResult => {
    res.json(finalResult);
  });
})

router.post("/", (req, res) => {
  db.Tag.create(red.body)
  .then((dbRes) => {
    console.log(dbRes)
    res.json(dbRes)
  })
});

module.exports = router;
