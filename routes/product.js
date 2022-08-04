var express = require("express");
var router = express.Router();

const productController = require("../components/products/product_controller");
const categoriesController = require("../components/categories/categories_controller");
const userController = require("../components/users/user_controller");
const middleware = require("../middleware/upload");


module.exports = router;
