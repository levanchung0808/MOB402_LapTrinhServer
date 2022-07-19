var express = require("express");
var router = express.Router();

const userController = require("../components/users/user_controller");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

// * 1. đăng nhập
// * http://localhost:3000/dang-nhap
// * get: chạy ra login
// * post: thực hiện login
// *
router.get("/dang-nhap", function (req, res, next) {
  res.render("dang-nhap");
});

router.post("/dang-nhap", async function (req, res, next) {
  const {email, password} = req.body;
  const user = await userController.login(email, password);
  if (user) {
    res.redirect("/");
  } else {
    res.redirect("/dang-nhap");
  }
});

// * 2. đăng xuất
// * http://localhost:3000/dang-xuat
// * get: chạy đăng xuất
router.get("/dang-xuat", function (req, res, next) {
  
  res.redirect("/dang-nhap");
});


module.exports = router;
