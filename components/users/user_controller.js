const userService = require("./user_service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  return await userService.login(email, password);
};

const get = async (page, size) => {
  page = page || 1;
  size = size || 3;
  return await userService.get(page, size);
};

const getById = async (id) => {
  return await userService.getInfo(id);
};

const insert = async (user) => {
  //mã hoá password trc khi signIn
  user.password = await bcrypt.hashSync(user.password, 10);
  return await userService.insert(user);
};

const update = async (id, user) => {
  await userService.update(id, user);
};

const remove = async (id) => {
  await userService.remove(id);
};

const signUp = async (username, password, fullname, image) => {
  try {
    const check = await userService.checkUsername(username);
    if (check) {
      throw new Error("Account already exists");
    }
    //mã hoá password trc khi signIn
    const hasPassword = await bcrypt.hashSync(password, 10);
    return await userService.signUp(username, hasPassword, fullname, image);
  } catch (error) {
    throw new Error(error.message || "Error");
  }
};

const signIn = async (username, password) => {
  try {
    const user = await userService.signIn(username);
    if (user) {
      const check = await bcrypt.compareSync(password, user.password);
      if (check) {
        //tạo token với username là id của user
        const token = jwt.sign(
          { username: user.username, _id: user._id, isAdmin: user.isAdmin },
          "secret",
          { expiresIn: 30 * 24 * 60 * 60 }
        );
        //tạo refresh token 90 days
        return token;
      } else {
        throw new Error("Login failed");
      }
    } else {
      throw new Error("Login failed");
    }
  } catch (error) {
    throw new Error(error.message || "Error");
  }
};

const getInfo = async (id) => {
  try {
    return await userService.getInfo(id);
  } catch (error) {
    console.log(error);
    throw new Error(error.message || "Error");
  }
};

module.exports = {
  login,
  get,
  insert,
  update,
  remove,
  getById,
  signUp,
  signIn,
  getInfo,
};
