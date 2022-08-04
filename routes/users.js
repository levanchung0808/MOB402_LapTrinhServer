var express = require("express");
var router = express.Router();
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");
const bcrypt = require("bcryptjs");

const productController = require("../components/products/product_controller");
const categoriesController = require("../components/categories/categories_controller");
const userController = require("../components/users/user_controller");
const middleware = require("../middleware/upload");

// * http://localhost:3000/nguoi-dung
// * get: xuất danh sách người dùng
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

// * http://localhost:3000/nguoi-dung/them-moi
// * get: thêm mới người dùng
router.get("/them-moi", async function (req, res, next) {
  if (!req.session || !req.session.user) {
    res.redirect("/dang-nhap");
  } else {
    res.render("them-moi");
  }
});

// * post: thêm mới người dùng
router.post(
  "/them-moi",
  upload.single("image"),
  async function (req, res, next) {
    if (!req.session || !req.session.user) {
      res.redirect("/dang-nhap");
    } else {
      // Upload image to cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);
      let { body } = req;
      let image = result.secure_url;
      body = { ...body, image: image };
      console.log(body);
      await userController.insert(body);
      res.redirect("/nguoi-dung");
    }
  }
);

// * http://locahost:3000/nguoi-dung/chi-tiet/chungok@gmail.com
// * get: lấy thông tin chi tiết 1 người dùng
router.get("/chi-tiet/:id", async function (req, res, next) {
  if (!req.session || !req.session.user) {
    res.redirect("/dang-nhap");
  } else {
    const { id } = req.params;
    const user = await userController.getById(id);
    res.render("chi-tiet", { user });
  }
});

//* post: cập nhật người dùng
router.post(
  "/chi-tiet/:id",
  upload.single("image"),
  async function (req, res, next) {
    if (!req.session || !req.session.user) {
      res.redirect("/dang-nhap");
    } else {
      let { body } = req;
      let { id } = req.params;
      console.log(req.file);
      console.log(body);
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        let image = result.secure_url;
        body = { ...body, image: image };
      }
      await userController.update(id, body);

      res.redirect("/nguoi-dung");
    }
  }
);

// * 6. xóa user
// * http://localhost:3000/nguoi-dung/xoa/:id
// * delete: xóa 1 sản phẩm
router.post("/xoa/:id", async function (req, res, next) {
  if (!req.session || !req.session.user) {
    res.redirect("/dang-nhap");
  } else {
    let { id } = req.params;
    await userController.remove(id);
    res.json({ success: true });
  }
});

// * 7. thống kê
// * http://localhost:3000/san-pham/thong-ke
// * get: lấy thống kê sản phẩm, vẽ biểu đồ
router.get("/thong-ke",[] ,async function (req, res, next) {
  const categories = await categoriesController.get();
  res.render("thong-ke",{categories});
});

module.exports = router;
