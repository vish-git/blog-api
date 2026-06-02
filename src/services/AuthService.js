const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthService = (userRepository) => ({
  async login({ email, password }) {
    if (!email || !password) {
      const err = new Error('email and password are required');
      err.status = 400;
      throw err;
    }

    const user = await userRepository.findByEmail(email);
    if (!user) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      const err = new Error('Invalid credentials');
      err.status = 401;
      throw err;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    return { token, user: { id: user._id, username: user.username, email: user.email } };
  }
});

module.exports = AuthService;
