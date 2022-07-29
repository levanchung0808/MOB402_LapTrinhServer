var express = require("express");
var router = express.Router();

const productController = require("../components/products/product_controller");
const categoriesController = require("../components/categories/categories_controller");
const userController = require("../components/users/user_controller");
const middleware = require("../middleware/upload");

// * 6. xóa sản phẩm
// * http://localhost:3000/san-pham/
// * delete: xóa 1 sản phẩm

router.post("/xoa/:id", [], async function (req, res, next) {
  let { id } = req.params;
  await productController.remove(id);
  res.json({ success: true });
});

// * 7. thống kê
// * http://localhost:3000/san-pham/thong-ke
// * get: lấy thống kê sản phẩm, vẽ biểu đồ
router.get("/thong-ke",[] ,async function (req, res, next) {
  const categories = await categoriesController.get();
  res.render("thong-ke",{categories});
});

module.exports = router;
