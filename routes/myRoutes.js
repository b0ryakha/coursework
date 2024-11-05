const express = require('express');
const myController = require('../controllers/myController');
const AuthController = require('../controllers/authController');

const router = express.Router();

router.get('/getAll', (req, res) => myController.getAll(req, res));
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
