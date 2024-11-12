const bcrypt = require("bcrypt")
const pool = require("../db")

class UserRepository {
    static async findUserByEmail(email) {
        try {
            const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
            return result.rows[0]
        } catch (error) {
            throw new Error("Ошибка при поиске пользователя: " + error.message)
        }
    }

    static async createUser(email, password, role) {
        try {
            if (await this.findUserByEmail(email))
                throw new Error("Пользователь с таким email уже существует")

            const hashedPassword = await this.hashPassword(password)
            await pool.query("INSERT INTO users (email, password, role) VALUES ($1, $2, $3)", [email, hashedPassword, role])

            return { email: email, role: role }
        } catch (error) {
            throw new Error("Ошибка при создании пользователя: " + error.message)
        }
    }

    static async fetchUsers() {
        try {
            const result = await pool.query("SELECT id, email, role FROM users")
            return result.rows
        } catch (error) {
            throw new Error("Ошибка при чтении пользователей: " + error.message)
        }
    }

    static async hashPassword(password) {
        return await bcrypt.hash(password, 10)
    }

    static async comparePassword(password, hashed_password) {
        return await bcrypt.compare(password, hashed_password)
    }
}

module.exports = UserRepository