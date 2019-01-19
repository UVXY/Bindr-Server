require('dotenv').config()

const express = require('express');
const router = express.Router();
const multer  = require('multer');
const cloudinary = require('cloudinary');
const db = require('../../db/models');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp/audio_uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})

const upload = multer({ storage: storage })

router.post("/comment", upload.none(), (req, res) => {
  db.Comment.create(req.body).then((comment) => {
		return db.Book.findOneAndUpdate({ _id: req.params.id }, { $push: {comments: comment._id }}, { new: true });
  })
  .catch(function(err) {
		console.log(err)
    res.json(err);
  });
});

router.post("/comment/audio", upload.single("audio-comment"), (req, res) => {
  cloudinary.v2.uploader.upload(
    `./tmp/audio_uploads${req.file.filename}`, 
    (err, res) => {
      console.log(res, err)
    }
  ).catch(function(err) {
		console.log(err)
    res.json(err);
  });
});

module.exports = router;
