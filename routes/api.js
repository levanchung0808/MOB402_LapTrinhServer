var express = require("express");
var router = express.Router();

const userController = require("../components/users/user_controller");
const authen = require("../middleware/authen");

router.post("/sign-up", async (req, res) => {
  try {
    const { username, password, fullname, image } = req.body;
    const token = await userController.signUp(
      username,
      password,
      fullname,
      image
    );
    // token.defineProperty()
    res.status(200).json({ error: false, user: token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    const data = await userController.signIn(username, password);
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/user-info", [authen.checkToken], async function (req, res, next) {
  try {
    const { username, _id, isAdmin } = req.user;
    const user = await userController.getInfo(_id);
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: error.message });
  }
});

router.get("/save-state", [authen.checkToken], async function (req, res, next) {
  try {
    const { _id } = req.user;
    const {name, posX, posY } = req.body;
    const user = await userController.getInfo(_id);
    user.name = name;
    user.levels.posX = Number(posX),
    user.levels.posY = Number(posY),
    res.status(200).json({error: false, user});
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: error.message });
  }
});

module.exports = router;
