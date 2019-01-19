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
    cb(null, '../../tmp/audio_uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname)
  }
})

const upload = multer({ storage: storage })

router.post("/comment/audio", upload.single("audio-comment"), (req, res) =>{

  
});