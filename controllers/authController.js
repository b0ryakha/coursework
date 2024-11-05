// controllers/AuthController.js
const AuthService = require('../services/AuthService');

class AuthController {
  static async register(req, res) {
    try {
      const { email, password } = req.body;
      const response = await AuthService.register(email, password);
      res.status(201).json(response);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await AuthService.login(email, password);
      req.session.user = user;
      res.status(200).json({ message: 'Авторизация успешна' });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  }
}

module.exports = AuthController;
