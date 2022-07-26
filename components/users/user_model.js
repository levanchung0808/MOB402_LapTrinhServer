const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    // required: false,
    // ref: "department",
    // default: null,
  },
  coin: { type: Number },
  fullname: { type: String },
  image: { type: String },
  levels: { type: Schema.Types.ObjectId, ref: 'level', default: null,},
  password: { type: String },
  score: { type: Number },
  username: { type: String },
  booster_id: { type: Schema.Types.ObjectId, ref: "booster", default: null,}, // FK
  character_id: { type: Schema.Types.ObjectId, ref: "character", default: null, }, // FK
});

module.exports = mongoose.model("user", userSchema);
