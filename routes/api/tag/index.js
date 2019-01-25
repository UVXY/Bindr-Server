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
  .populate("lists")
  .then((tagRes) => {
    const fullList = [];
    tagRes.lists.map(list => {
      fullList.push(list);
    });
    const finalResults = [];
    fullList.forEach(list => {
      const listRes = []; 
      list.books.forEach(book => {
        db.Book.findOne({_id: book}).then(dbRes => {
          listRes.push(dbRes);
        });
      });
      finalResults.push(listRes);
    });
    res.json(finalResults);
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
