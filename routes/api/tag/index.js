const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.put("/:tag", (req, res) => {
  db.List.findOne({_id: req.body.listId}, (listRes) => {
    return db.Tag.findOneAndUpdate(
      {tagName: req.params.tag}, 
      {$push: {lists: listRes._id}}, 
      {new: true }
    );
  })
  .catch(function(err) {
		console.log(err)
    res.json(err);
  });
})

router.get("/:tag", (req, res) => {
  db.Tag.findOne({tagName: req.params.tag})
  .populate("lists")
  .then((tagRes) => {
    const fullList = [];
    tagRes.lists.forEach(list => {
      list.populate("books");
      fullList.push(list.books)
    });
    return fullList;
  })
  .then((fullList) => {
    const rn = Math.floor(Math.random(fullList.length));
    const rnTwo = Math.floor(Math.random(fullList[rn].length));
    res.json(fullList[rn][rnTwo]);
  })
})

router.post("/", (req, res) => {
  db.Tag.create(red.body)
  .then((dbRes) => {
    console.log(dbRes)
    res.json(dbRes)
  })
});

module.exports = router;
