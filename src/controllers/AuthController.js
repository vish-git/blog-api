const UserRepository = require('../repositories/UserRepository');
const RegisterUserService = require('../services/RegisterUserService')(UserRepository);
const AuthService = require('../services/AuthService')(UserRepository);

exports.register = async (req, res, next) => {
  try {
    const result = await RegisterUserService.execute(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
};
