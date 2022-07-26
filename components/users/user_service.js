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
  const items = await productModel
    .find({})
    .skip((page - 1) * size)
    .limit(size);
  console.log(items);
  return items;
};

const getById = async (id) => {
  const product = products.find((product) => product._id.toString() == id);
  return product;
};

var users = [
  { _id: 1, email: "admin@gmail.com", password: "admin" },
  { _id: 2, email: "user@gmail.com", password: "user" },
];

module.exports = { login, get };
