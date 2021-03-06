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
    db.List.find({_id: {$in: tagRes.lists}})
    .populate("books")
    .then(dbListRes => {
      const bookLists = [];
      dbListRes.forEach(filledList => {
        bookLists.push(filledList.books);
      });
      return bookLists;
    })
    .then(bookLists => {
      let finalRes = [];
      bookLists.forEach(list => {
        const tempBkList = []
        while (tempBkList.length < 30/bookLists.length) {
          const rn = Math.floor(Math.random() * Math.floor(list.length));
          const test = Math.floor(Math.random() * Math.floor(list.length));
          if (rn <= test) {
            tempBkList.push(list[rn]);
          }
        }
        finalRes = finalRes.concat(tempBkList);
      });
      res.json(finalRes);
    });
  });
});

router.post("/", (req, res) => {
  db.Tag.create(red.body)
  .then((dbRes) => {
    console.log(dbRes)
    res.json(dbRes)
  })
});

module.exports = router;
