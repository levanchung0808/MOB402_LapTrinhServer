const productService = require("./product_service");
const categoriesService = require("../categories/categories_service");

const get = async (page, size) => {
  page = page || 1;
  size = size || 3;
  return await productService.get(page, size);
};

const getById = async (id) => {
  const product = await productService.getById(id);
  const categories = await categoritesService.get();
  categories = categories.map((category) => {
    category = { ...category, isSelected: false };
    if (product.category.toString() == category.id.toString()) {
      category.isSelected = true;
    }
    return category;
  });
  return { product, categories };
};

const insert = async(product) => {
  await productService.insert(product);
}

const update = async(id, product) => {
  await productService.update(id, product);
}

const remove = async(id) => {
  await productService.remove(id);
}

module.exports = { get, getById, insert, update, remove };
