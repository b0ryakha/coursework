const UserRepository = require("../repositories/UserRepository")
const jwt = require("jsonwebtoken")

class AuthService {
    static async register(email, password, role) {
        const user = await UserRepository.createUser(email, password, role)
        return { message: `Пользователь ${user.email} зарегистрирован` }
    }

    static async login(email, password) {
        const user = await UserRepository.findUserByEmail(email)
        
        if (!user)
            throw new Error("Пользователь не найден")

        if (!await UserRepository.comparePassword(password, user.password))
            throw new Error("Неверный email или пароль")

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: "2h" })

        return { user: user, token: token }
    }
}

module.exports = AuthService