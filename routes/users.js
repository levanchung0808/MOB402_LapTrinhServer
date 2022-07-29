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
// * http://locahost:3000/nguoi-dung/them-moi
// * get: lấy thông tin chi tiết 1 người dùng
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
    //mã hoá password
    console.log(body);

    let image = result.secure_url;
    body = { ...body, image: image };
    console.log(body);
    await userController.insert(body);
    // res.json(result);

    // if (file) {
    //   let image = `http://192.168.1.4:3000/images/${file.filename}`;
    //   body = { ...body, image: image };
    // }
    // await userController.insert(body);

    res.redirect("/nguoi-dung");
  }
);

//cập nhật sản phẩm
router.post(
  "/edit",
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

module.exports = router;
