const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const levelSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: String },
  posX: { type: Number },
  posY: { type: Number },
});

module.exports = mongoose.model("level", levelSchema);
