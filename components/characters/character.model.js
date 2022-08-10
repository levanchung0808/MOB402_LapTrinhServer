const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const characterSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  image: { type: String },
  name: { type: String },
  price: { type: Number },
  
});

module.exports = mongoose.model("character", characterSchema);
