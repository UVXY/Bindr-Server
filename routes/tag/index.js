const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.post("/tag", (req, res) => {
  db.Tag.create(red.body)
  .then((dbRes) => {
    console.log(dbRes)
    res.json(dbRes)
  })
});

router.put("/tag/:tag", (req, res) => {
  db.List.findOne({_id: req.body.listId}, (listRes) => {
    return db.Tag.findOneAndUpdate({tagName: req.params.tag}, {$push: {lists: listRes._id}}, {new: true })
  })
  .catch(function(err) {
		console.log(err)
    res.json(err);
  });
})

router.get("/tag/:tag", (req, res) => {
  db.Tag.find({tagName: req.params.tag})
  .populate("lists")
  .then((listRes) => {
    const fullList = [];
    listRes.forEach(list => {
      list.populate("books");
      fullList.push(list.books)
    });
    return fullList;
  })
  .then((fullList) => {
    const rn = Math.floor(Math.random(fullList.length));
    res.json(fullList[rn]);
  })
})

module.exports = router;
