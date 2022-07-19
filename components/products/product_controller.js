const productService = require("./product_service");

exports.get = async (page, size) => {
    page = page || 1;
    size = size || 3;
  return await productService.get(page, size);
};

exports.getById = async (id) => {
  return await productService.getById(id);
};
