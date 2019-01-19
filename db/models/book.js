const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  title: { 
    type: String, 
    required: true 
  },
  subtitle: { 
    type: String },
  authors: { 
    type: [String], 
    required: true 
  },
  summary: { 
    type: String, 
    required: true 
  },
  image: { 
    type: String, 
    required: true 
  },
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: "Comments"
    }
  ],
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  ]
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
