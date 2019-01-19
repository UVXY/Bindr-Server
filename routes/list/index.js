const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.post("/list", (req, res) => {
  db.List.create(req.body)
  .then((dbRes) => {
    console.log(dbRes);
    res.json(dbRes);
  })
});

router.put("/list/:list", (req, res) => {
  db.Tag.findOne({tagName: req.body.tag})
  .then((tagRes) => {
    return db.List.findOneAndUpdate(
      {_id: req.params.listId}, 
      {$push: { tags: tagRes._id}}, 
      {new: true});
  })
});

module.exports = router;