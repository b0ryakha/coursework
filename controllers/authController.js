const AuthService = require("../services/AuthService")

class AuthController {
    static async register(req, res) {
        try {
            const { email, password, role } = req.body
            if (!email || !password)
                throw new Error("Email и пароль обязательны")

            const user = await AuthService.register(email, password, role)
            const { _, token } = await AuthService.login(email, password)
            res.cookie("token", token, { httpOnly: true, secure: true });

            if (user.role == "admin")
                return res.redirect("/admin_panel")
            else
                return res.redirect("/")
        } catch (error) {
            return res.json({ message: "Ошибка при регистрации", error: error.message })
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body
            if (!email || !password)
                throw new Error("Email и пароль обязательны")
    
            const { _, token } = await AuthService.login(email, password)
            res.cookie("token", token, { httpOnly: true, secure: true });

            return res.redirect("/")
        } catch (error) {
            return res.json({ message: "Ошибка при авторизации", error: error.message })
        }
    }    
}

module.exports = AuthController