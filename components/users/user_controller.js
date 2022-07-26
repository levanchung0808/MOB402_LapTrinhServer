const userService = require('./user_service');

const login = async (email, password) => {
    return await userService.login(email, password);
};

const get = async (page, size) => {
    page = page || 1;
    size = size || 3;
    return await userService.get(page, size);
  };

module.exports = { login, get };