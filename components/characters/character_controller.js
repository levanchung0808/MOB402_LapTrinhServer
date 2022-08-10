const characterService = require("./character_service");

const get = async () => {
  return await characterService.get();
};

module.exports = { get };

