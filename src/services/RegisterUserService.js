const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const RegisterUserService = (userRepository) => ({
  async execute({ username, email, password }) {
    if (!username || !email || !password) {
      const err = new Error('username, email and password are required');
      err.status = 400;
      throw err;
    }

    const existing = await userRepository.findByEmail(email);
    if (existing) {
      const err = new Error('User already exists');
      err.status = 409;
      throw err;
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const user = await userRepository.create({ username, email, passwordHash });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { user: { id: user._id, username: user.username, email: user.email }, token };
  }
});

module.exports = RegisterUserService;
