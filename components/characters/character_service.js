const characterModel = require("../characters/character.model");
const get = async (page, size) => {
  const items = await characterModel
    .find({})
    .skip((page - 1) * size)
    .limit(size);
  return items;
};

module.exports = { get };