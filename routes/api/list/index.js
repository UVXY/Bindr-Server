const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.put("/:list", (req, res) => {
  db.Tag.findOne({tagName: req.body.tag})
  .then((tagRes) => {
    return db.List.findOneAndUpdate(
      {_id: req.params.list}, 
      {$push: { tags: tagRes._id}}, 
      {new: true});
  })
});

router.get("/:title", (req, res) => {
   db.List.findOne({title: req.params.title})
  .then((dbRes) => {
      res.json(dbRes);
  });
});

router.post("/", (req, res) => {
  db.List.create(req.body)
  .then((dbRes) => {
    console.log(dbRes);
    res.json(dbRes);
  })
});

module.exports = router;
