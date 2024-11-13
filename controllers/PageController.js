const PageService = require("../services/PageService")

class PageController {
    static async catalog(req, res) {
        try {
            const data = await PageService.products()
            res.render("catalog", { data: data, user: req.user })
        } catch (error) {
            return res.json({ message: "Ошибка при чтении данных", error: error.message })
        }
    }

    static async authorization(req, res) {
        res.render("authorization", { user: req.user })
    }

    static async registration(req, res) {
        res.render("registration", { user: req.user })
    }

    static async order(req, res) {
        res.render("order", { user: req.user })
    }

    static async adminPanel(req, res) {
        if (req.user.role != "admin")
            return res.json({ message: "У текущего пользователя не достаточно прав", error: `${req.user.role} != "admin"` })

        try {
            const data = await PageService.users()
            res.render("admin_panel", { data: data, user: req.user })
        } catch (error) {
            return res.json({ message: "Ошибка при чтении данных", error: error.message })
        }
    }
}

module.exports = PageController