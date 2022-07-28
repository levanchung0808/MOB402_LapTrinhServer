const userModel = require("../users/user_model");

const login = async (email, password) => {
  let user = users.filter((item) => item.email == email);
  if (user.length > 0) {
    if (user[0].password == password) {
      return user[0];
    }
  }
  return null;
};

const get = async (page, size) => {
  //select id,name from products
  // const items = products.slice((page - 1) * size, page * size);
  const items = await userModel
    .find({})
    .skip((page - 1) * size)
    .limit(size);
  return items;
};

const getById = async (id) => {
  const product = products.find((product) => product._id.toString() == id);
  return product;
};

//APP
const signIn = async (username, password) => {
  try {
    let user = await userModel.find({ username });
    if (user.length > 0) {
      return user[0];
    }
    return null;
  } catch (error) {
    throw new Error("Có lỗi rồi");
  }
};

const signUp = async (username, password) => {
  const user = new userModel({username, password});
  return await user.save();
};

const checkUsername = async (username) => {
  try {
    let user = await userModel.find({ username });
    if (user.length > 0) return true;
    return false;
  } catch (error) {
    throw new Error("Có lỗi rồi");
  }
};

const getInfo = async (id) =>{
  const user = await userModel.findById(id);
  return user;
}

var users = [
  { _id: 1, email: "admin@gmail.com", password: "admin" },
  { _id: 2, email: "user@gmail.com", password: "user" },
];

module.exports = { login, get, signIn, signUp, checkUsername, getInfo };
