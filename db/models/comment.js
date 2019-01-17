const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  author: {
    type: String,
    required: true
  },
  content: {
    type: String
  },
  audio: {
    type: Boolean,
    required: true
  },
  contentLink: {
    type: String
  }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;