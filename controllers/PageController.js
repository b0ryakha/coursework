const MyService = require("../services/MyService")

class PageController {
    static async main(req, res) {
        res.render("main")
    }

    static async authorization(req, res) {
        res.render("authorization")
    }

    static async registration(req, res) {
        res.render("registration")
    }

    static async adminPanel(req, res) {
        if (req.user.role != "admin") {
            res.json({ message: "У текущего пользователя не достаточно прав", error: `${req.user.role} != "admin"` })
            return
        }

        try {
            const data = await MyService.getUsers()
            res.render("admin_panel", { data })
        } catch (error) {
            res.json({ message: "Ошибка при чтении данных", error: error.message })
        }
    }
}

module.exports = PageController