const userService = require('./user_service');

exports.login = async (email, password) => {
    return await userService.login(email, password);
};