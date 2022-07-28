var express = require("express");
var router = express.Router();

const productController = require("../components/products/product_controller");
const categoriesController = require("../components/categories/categories_controller");
const userController = require("../components/users/user_controller");
const middleware = require("../middleware/upload");

// * 3. sản phẩm
// * http://localhost:3000/san-pham
// * get: xuất danh sách sản phẩm
// * post: thêm mới sản phẩm
router.get("/", async function (req, res, next) {
  if (!req.session || !req.session.user) {
    res.redirect("/dang-nhap");
  } else {
    const { page, size } = req.query;
    const products = await productController.get(page, size);
    const users = await userController.get(page, size);
    const categories = await categoriesController.get();
    res.render("san-pham", {
      users,
      products,
      categories,
      _categories: JSON.stringify(categories),
    });
  }
});

// * 4. chi tiết 1 sản phẩm
// * http://locahost:3000/san-pham/chi-tiet/1
// * get: lấy thông tin chi tiết 1 sản phẩm
// * put: cập nhật thông tin sản phẩm
router.get("/chi-tiet/:id", async function (req, res, next) {
  const { id } = req.params;
  const { product, categories } = await productController.getById(id);
  res.render("san-pham", { product, categories });
});

// * 5. sản phẩm
// * http://locahost:3000/san-pham/them-moi
// * get: lấy thông tin chi tiết 1 sản phẩm
// * put: cập nhật thông tin sản phẩm
router.get("/them-moi", async function (req, res, next) {
  const categories = await categoriesController.get();
  res.render("them-moi", { categories });
});

//thêm mới sản phẩm
router.post(
  "/them-moi",
  [middleware.single("image")],
  async function (req, res, next) {
    let { body, file } = req;
    if (file) {
      let image = `http://192.168.1.4:3000/images/${file.filename}`;
      body = { ...body, image: image };
    }
    await productController.insert(body);

    res.redirect("/san-pham");
  }
);

//cập nhật sản phẩm
router.post(
  "/them-moi",
  [middleware.single("image")],
  async function (req, res, next) {
    let { body, file } = req;
    let { id } = req.params;
    delete body.image;
    if (file) {
      let image = `http://192.168.1.4:3000/images/${file.filename}`;
      body = { ...body, image: image };
    }
    await productController.update(id, body);

    res.redirect("/san-pham");
  }
);

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
