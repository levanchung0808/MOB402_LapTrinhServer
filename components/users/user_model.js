const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  // _id: {
  //   type: Schema.Types.ObjectId,
  //   // required: false,
  //   // ref: "department",
  //   // default: null,
  // },
  coin: { type: Number, default: 0 },
  fullname: { type: String, required: true },
  image: { type: String, required: true },
  levels: { type: Schema.Types.ObjectId, ref: "level", default: null },
  password: { type: String, required: true },
  score: { type: Number, default: 0 },
  username: { type: String, unique: true },
  // booster_id: { type: Schema.Types.ObjectId, ref: "booster", default: null,}, // FK
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
