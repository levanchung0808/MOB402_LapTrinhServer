var express = require("express");
var router = express.Router();

const userController = require("../components/users/user_controller");
const authen = require("../middleware/authen");

// router.post("/dang-nhap", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await userController.login(email, password);
//     if (user) {
//       req.session.user = user;
//       res.redirect("/");
//     } else {
//       res.redirect("/dang-nhap");
//     }
//   } catch (error) {
//     res.render("error");
//   }
// });

router.post("/sign-up", async (req, res) => {
  try {
    const { username, password, fullname, image } = req.body;
    const token = await userController.signUp(username, password, fullname, image);
    token.defineProperty()
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await userController.signIn(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user-info", [authen.checkToken], async function (req, res, next) {
  try {
    const { username, _id, isAdmin } = req.user;
    const user = await userController.getInfo(_id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error)
    res.status(501).json({ error: error.message });
  }
});

module.exports = router;
