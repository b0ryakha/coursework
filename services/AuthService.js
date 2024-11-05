// services/AuthService.js
const UserRepository = require('../repositories/userRepository');
const bcrypt = require('bcrypt');

class AuthService {
  async register(email, password) {
    const existingUser = await UserRepository.findUserByEmail(email);
    if (existingUser) {
      throw new Error('Пользователь уже существует');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserRepository.createUser(email, hashedPassword);
    return { message: 'Пользователь зарегистрирован' };
  }

  async login(email, password) {
    const user = await UserRepository.findUserByEmail(email);
    if (!user || !await bcrypt.compare(password, user.password)) {
      throw new Error('Неверный email или пароль');
    }

    return user;
  }
}

module.exports = new AuthService();
