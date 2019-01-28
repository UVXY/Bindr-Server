require('dotenv').config()

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const cloudinary = require('cloudinary');
const db = require('../../../db/models');

cloudinary.config(process.env.CLOUDINARY_URL);

const upload = multer({ dest: "/tmp/audio_uploads"}).single("audio-comment");

router.post("/audio", (req, res) => {
  upload(req, res, function(upErr) {
		if (upErr){
			res.json(upErr);
		} else {
      const {author, content, audio, id} = req.body;
      const {path, originalname} = req.file
      cloudinary.v2.uploader.upload(
        path, 
        {
          public_id: originalname,
          resource_type: "video"
        },
        (cloudErr, cloudRes) => {
          if (cloudErr) {
            res.json(cloudErr);
          } else {
            const audioComment = {
              author: author,
              content: content,
              audio: audio,
              contentLink: cloudRes.url
            };
            db.Comment.create(audioComment).then(commentRes => {
              return db.Book.findOneAndUpdate(
                { _id: id }, 
                { $push: {comments: commentRes._id }}, 
                { new: true }
              );
            });
          }
        })
        .catch(function(err) {
          res.json(err);
      });
    }
  });
});

router.post("/", (req, res) => {
  const {author, content, audio, id} = req.body;
  db.Comment.create({
    author: author,
    content: content,
    audio: audio
  }).then((comment) => {
		db.Book.findOneAndUpdate(
      { _id: id }, 
      { $push: {comments: comment._id }}, 
      { new: true }
    ).then(dbRes => {
      console.log(dbRes);
      res.status(200).send("Done!");
    });
  })
  .catch(function(err) {
    res.json(err);
  });
});

module.exports = router;
