var express = require("express");
var router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

const productController = require("../components/products/product_controller");
const categoriesController = require("../components/categories/categories_controller");
const userController = require("../components/users/user_controller");
const middleware = require("../middleware/upload");

// * 3. sản phẩm
// * http://localhost:3000/nguoi-dung
// * get: xuất danh sách người dùng
// * post: thêm mới người dùng
router.get("/", async function (req, res, next) {
  if (!req.session || !req.session.user) {
    res.redirect("/dang-nhap");
  } else {
    const { page, size } = req.query;
    const products = await productController.get(page, size);
    const users = await userController.get(page, size);
    const categories = await categoriesController.get();
    res.render("nguoi-dung", {
      users,
      products,
      categories,
      _categories: JSON.stringify(categories),
    });
  }
});

// * 5. sản phẩm
// * http://locahost:3000/nguoi-dung/chi-tiet
// * get: lấy thông tin chi tiết 1 người dùng
router.get("/chi-tiet/:id", async function (req, res, next) {
  // if (!req.session || !req.session.user) {
  //   res.redirect("/dang-nhap");
  // } else {
  // }
  const { id } = req.params;
  let user = await userController.getById(id);
  delete user.password;
  console.log(user);
  res.render("chi-tiet", { user });
});

// * put: cập nhật thông tin người dùng
router.get("/them-moi", async function (req, res, next) {
  res.render("them-moi");
});

//thêm mới user
router.post(
  "/them-moi",
  upload.single("image"),
  async function (req, res, next) {
    // Upload image to cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    let { body } = req;
    let image = result.secure_url;
    body = { ...body, image: image };
    await userController.insert(body);
    res.redirect("/nguoi-dung");
  }
);

//cập nhật sản phẩm
router.post(
  "/cap-nhat",
  upload.single("image"),
  async function (req, res, next) {
    const result = await cloudinary.uploader.upload(req.file.path);
    let { body } = req;
    let image = result.secure_url;
    body = { ...body, image: image };
    await userController.update(body);

    res.redirect("/");
  }
);

// * 6. xóa user
// * http://localhost:3000/nguoi-dung/xoa/:id
// * delete: xóa 1 sản phẩm
router.post("/xoa/:id", async function (req, res, next) {
  let { id } = req.params;
  await productController.remove(id);
  res.json({ success: true });
});

module.exports = router;
