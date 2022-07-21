const categoriesService = require("./categories_service");

const get = async () => {
  return await categoriesService.get();
};

module.exports = { get };

