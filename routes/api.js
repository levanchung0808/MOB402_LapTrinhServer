var express = require("express");
var router = express.Router();

const userController = require("../components/users/user_controller");

router.post("/dang-nhap", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userController.login(email, password);
    if (user) {
      req.session.user = user;
      res.redirect("/");
    } else {
      res.redirect("/dang-nhap");
    }
  } catch (error) {
    res.render("error");
  }
});

router.post("/sign-up", async (req, res) => {
  try {
    const { username, password } = req.body;
    const token = await userController.signUp(username, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const token = await userController.signIn(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
