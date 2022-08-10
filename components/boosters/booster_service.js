const boosterModel = require("../boosters/booster_model");
const get = async (page, size) => {
  const items = await boosterModel
    .find({})
    .skip((page - 1) * size)
    .limit(size);
  return items;
};

module.exports = { get };