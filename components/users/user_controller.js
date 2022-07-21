const userService = require('./user_service');

const login = async (email, password) => {
    return await userService.login(email, password);
};

module.exports = { login };