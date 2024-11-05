const UserRepository = require("../repositories/UserRepository")

class AuthService {
    static async register(email, password) {
        const user = await UserRepository.createUser(email, password)
        return { message: `Пользователь ${user.email} зарегистрирован` }
    }

    static async login(email, password) {
        const user = await UserRepository.findUserByEmail(email)
            
        if (!user)
            throw new Error("Пользователь не найден")

        if (!await UserRepository.comparePassword(password, user.password))
            throw new Error("Неверный email или пароль")

        return user
    }
}

module.exports = AuthService