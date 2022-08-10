const userModel = require("../users/user_model");
const nodemailer = require("nodemailer");

const login = async (username, password) => {
  // let user = users.find((item) => item.email == email);
  let user = await userModel.find({ username });
  if (user.length > 0) {
    return user[0];
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
  const user = await userModel.findById(id);
  if (user.length > 0) return user[0];
  return null;
};

const getByUsername = async (username) => {
  const user = await userModel.find(username);
  if (user.length > 0) return user[0];
  return null;
};

const insert = async (user) => {
  const _user = new userModel(user);
  await _user.save();
};

const update = async (id, user) => {
  if (!user.image) {
    delete user.image;
  }
  await userModel.findByIdAndUpdate(id, user);
};

const remove = async (id) => {
  await userModel.findByIdAndDelete(id);
};

//API
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

const signUp = async (username, password, fullname, image) => {
  const user = new userModel({ username, password, fullname, image });
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

const getAllUser = async () => {
  return await userModel.find().sort({ score: -1 });
};

const getInfo = async (id) => {
  const user = await userModel.findById(id);
  return user;
};

const saveState = async (id, level) => {
  const user = await userModel.findByIdAndUpdate(id, level);
  return user;
};

const saveScore = async (username, score) => {
  const user = await userModel.find({ username });
  console.log(username, score);
  if (user[0]) {
    const numbScore = Number.parseInt(score);
    if (user[0].score < numbScore) {
      return await userModel.findByIdAndUpdate(user[0]._id, {$set: {score: numbScore}});
    }else{
      return null;
    }
  }
};

const sendEmail = async (email) => {
  let transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "levanchunq123@gmail.com",
      pass: "cspbwiavrhwxlxbw",
    },
  });

  try {
    const html = `<h1>Hello Nam</h1>`;
    await transporter.sendMail({
      from: "levanchunq123@gmail.com",
      to: "chunglvps19319@fpt.edu.vn",
      subject: "aloalo ok",
      html: html,
    });
    return { message: "Gửi email thành công" };
  } catch (errors) {
    throw errors;
  }
};

module.exports = {
  login,
  get,
  insert,
  update,
  remove,
  getById,
  getByUsername,
  signIn,
  signUp,
  checkUsername,
  getAllUser,
  getInfo,
  saveState,
  saveScore,
  sendEmail,
};
