const categoriesService = require("./categories_service");

exports.get = async () => {
  return await categoriesService.get();
};

