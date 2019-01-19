const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tagSchema = new Schema({
  tagName: {
    type: String,
    required: true
  },
  lists: [
    {
      type: Schema.Types.ObjectId,
      ref: "List"
    }
  ]
});

const Tag = mongoose.model("Tag", tagSchema);

module.exports = Tag;