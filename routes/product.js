var express = require("express");
var router = express.Router();

const productController = require("../components/products/product_controller");
const categoriesController = require("../components/categories/categories_controller");
const userController = require("../components/users/user_controller");
const middleware = require("../middleware/upload");


// * 7. thống kê
// * http://localhost:3000/san-pham/thong-ke
// * get: lấy thống kê sản phẩm, vẽ biểu đồ
router.get("/thong-ke",[] ,async function (req, res, next) {
  const categories = await categoriesController.get();
  res.render("thong-ke",{categories});
});

module.exports = router;
