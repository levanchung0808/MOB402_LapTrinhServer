const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const boosterSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: String },
  price: { type: Number },
  quantity: { type: Number },
  image: { type: String },
});

module.exports = mongoose.model("booster", boosterSchema);
