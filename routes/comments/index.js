const express = require('express');
const router = express.Router();
const multer  = require('multer');
const db = require('../../db/models');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../../tmp/audio_uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})

const upload = multer({ storage: storage })

router.post("/comment/audio", upload.single("audio-comment"), (req, res) =>{
  
});