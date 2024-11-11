const MyService = require("../services/MyService")

class MyController {
    static async getMain(req, res) {
        try {
            const data = await MyService.getUsers()
            res.render("main", { data })
        } catch (error) {
            res.json({ message: "Ошибка при чтении данных", error: error.message })
        }
    }

    static async getProtected(req, res) {
        res.json({ message: "Добро пожаловать на защищенную страницу", user: req.user })
    }
}

module.exports = MyController