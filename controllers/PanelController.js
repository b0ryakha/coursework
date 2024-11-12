const UserRepository = require("../repositories/UserRepository")

class PanelController {
    static async deleteUser(req, res) {
        try {
            await UserRepository.removeUserById(req.params.id)
            res.json({ message: "Пользователь успешно удален" })
        } catch (error) {
            res.json({ message: "Ошибка при удалении пользователя", error: error.message })
        }
    }

    static async deleteAll(req, res) {
        try {
            await UserRepository.removeUsers()
            res.json({ message: "Таблица пользователей была успешно очищена" })
        } catch (error) {
            res.json({ message: "Ошибка при удалении всех пользователей", error: error.message })
        }
    }
}

module.exports = PanelController