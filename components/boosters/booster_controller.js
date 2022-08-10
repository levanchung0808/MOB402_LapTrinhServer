const boosterService = require("./booster_service");

const get = async () => {
  return await boosterService.get();
};

module.exports = { get };

