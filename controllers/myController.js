const MyService = require("../services/MyService")

class MyController {
    static async getMain(req, res) {
        res.render("main")
    }

    static async getAuthorization(req, res) {
        try {
            const data = await MyService.getUsers()
            res.render("authorization", { data })
        } catch (error) {
            res.json({ message: "Ошибка при чтении данных", error: error.message })
        }
    }

    static async getRegistration(req, res) {
        try {
            const data = await MyService.getUsers()
            res.render("registration", { data })
        } catch (error) {
            res.json({ message: "Ошибка при чтении данных", error: error.message })
        }
    }

    static async getProtected(req, res) {
        res.json({ message: "Добро пожаловать на защищенную страницу", user: req.user })
    }
}

module.exports = MyController