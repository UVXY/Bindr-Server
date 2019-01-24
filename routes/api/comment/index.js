require('dotenv').config()

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const cloudinary = require('cloudinary');
const db = require('../../../db/models');

cloudinary.config(process.env.CLOUDINARY_URL);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/audio_uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})

const upload = multer({ storage: storage })

router.post("/audio", upload.single("audio-comment"), (req, res) => {
  cloudinary.v2.uploader.upload(
    `./tmp/audio_uploads${req.file.filename}`, 
    {resource_type: "video"},
    (err, cloudRes) => {
      if (err) {
        res.json(err);
      } else {
        const audioComment = {
          author: req.body.author,
          content: req.body.text,
          audio: true,
          contentLink: cloudRes.url
        };
        db.Comment.create(audioComment).then(commentRes => {
          return db.Book.findOneAndUpdate(
            { _id: req.body.id }, 
            { $push: {comments: commentRes._id }}, 
            { new: true }
          );
        });
      }
    }
  ).catch(function(err) {
		console.log(err);
  });
});

router.post("/", upload.none(), (req, res) => {
  db.Comment.create(req.body).then((comment) => {
		return db.Book.findOneAndUpdate(
      { _id: req.body.id }, 
      { $push: {comments: comment._id }}, 
      { new: true }
    );
  })
  .catch(function(err) {
		console.log(err)
    res.json(err);
  });
});

module.exports = router;
