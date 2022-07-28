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

const signUp = async (username, password) => {
  try {
    const check = await userService.checkUsername(username);
    if (check) {
      throw new Error("Tài khoản đã tồn tại");
      return;
    }
    //mã hoá password trc khi signIn
    const hasPassword = await bcrypt.hashSync(password, 10);
    return await userService.signUp(username, hasPassword);
  } catch (error) {
    throw new Error(error.message || "Có lỗi rồi");
  }
};

const signIn = async (email, password) => {
  try {
    const user = await userService.signIn(email);
    if (user) {
      const check = await bcrypt.compareSync(password, user.password);
      if (check) {
        //tạo token với username là id của user
        const token = jwt.sign(
          { username: user.username, id: user._id },
          "secret",
          { expiresIn: 1 * 60 }
        );
        return token;
      } else {
        throw new Error("Đăng nhập không thành công");
      }
    } else {
      throw new Error("Đăng nhập không thành công");
    }
  } catch (error) {
    throw new Error(error.message || "Có lỗi rồi");
  }
};

const getInfo = async (id) => {
  try {
    return await userService.getInfo(id);
  } catch (error) {
    throw new Error(error.message || "Có lỗi rồi");
  }
};

module.exports = { login, get, signUp, signIn, getInfo };
