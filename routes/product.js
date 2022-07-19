var express = require("express");
var router = express.Router();

const productController = require("../components/products/product_controller");

// * 3. sản phẩm
// * http://localhost:3000/san-pham
// * get: xuất danh sách sản phẩm
// * post: thêm mới sản phẩm
router.get("/", async function (req, res, next) {
  const { page, size } = req.query;
  const products = await productController.get(page, size);
  res.render("san-pham", { products });
});




// * 4. chi tiết 1 sản phẩm
// * http://locahost:3000/san-pham/:id/edit
// * get: lấy thông tin chi tiết 1 sản phẩm
// * put: cập nhật thông tin sản phẩm


// * 5. xóa sản phẩm
// * http://localhost:3000/san-pham/:id/delete
// * delete: xóa 1 sản phẩm


// * 6. thống kê
// * http://localhost:3000/san-pham/thong-ke
// * get: lấy thống kê sản phẩm, vẽ biểu đồ

module.exports = router;
