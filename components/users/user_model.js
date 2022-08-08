const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  coin: { type: Number, default: 0 },
  fullname: { type: String, required: true },
  image: { type: String, required: true },
  levels: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: "level",
      default: "62e9d77bc19348057fcbac59",
    },
    name: { type: String, default: "Level 1" },
    posX: { type: String, default: "0.0" },
    posY: { type: String, default: "0.0" },
  },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  username: { type: String, unique: true },
  booster_id: [
    {
      _id: { type: Schema.Types.ObjectId, ref: "booster", default: null }, // FK
      name: { type: String },
      price: { type: Number },
      quantity: { type: Number },
      image: { type: String },
    },
  ],
  character_id: {
    type: Schema.Types.ObjectId,
    ref: "character",
    default: null,
  }, // FK
  isAdmin: { type: Boolean, default: false },
});

module.exports = mongoose.model("user", userSchema);
