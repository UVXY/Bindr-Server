const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  tags: {
    type: Schema.Types.ObjectId,
    ref: "Tag"
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book"
    }
  ]
});

const List = mongoose.model("List", listSchema);

module.exports = List;