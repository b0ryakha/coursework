const PageService = require("../services/PageService")

class PageController {
    static async catalog(req, res) {
        try {
            const data = await PageService.products()
            res.render("catalog", { data, req })
        } catch (error) {
            res.json({ message: "Ошибка при чтении данных", error: error.message })
        }
    }

    static async authorization(req, res) {
        res.render("authorization", { req })
    }

    static async registration(req, res) {
        res.render("registration", { req })
    }

    static async basket(req, res) {
        res.render("basket", { req })
    }

    static async adminPanel(req, res) {
        if (req.user.role != "admin") {
            res.json({ message: "У текущего пользователя не достаточно прав", error: `${req.user.role} != "admin"` })
            return
        }

        try {
            const data = await PageService.users()
            res.render("admin_panel", { data, req })
        } catch (error) {
            res.json({ message: "Ошибка при чтении данных", error: error.message })
        }
    }
}

module.exports = PageController