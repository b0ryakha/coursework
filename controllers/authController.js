const AuthService = require("../services/AuthService")

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, role } = req.body
            if (!email || !password)
                throw new Error("Email и пароль обязательны")

            res.json(await AuthService.register(email, password, role))
        } catch (error) {
            res.json({ message: "Ошибка при регистрации", error: error.message })
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password)
                throw new Error("Email и пароль обязательны")
    
            const { user, token } = await AuthService.login(email, password)
            res.cookie("token", token, { httpOnly: true, secure: true });

            res.json({ message: "Авторизация успешна" })
        } catch (error) {
            res.json({ message: "Ошибка при авторизации", error: error.message })
        }
    }    
}

module.exports = AuthController