const UserRepository = require("../repositories/UserRepository")
const ProductRepository = require("../repositories/ProductRepository")

class PanelController {
    static async deleteUser(req, res) {
        try {
            await UserRepository.removeUserById(req.params.id)

            return res.redirect("/admin_panel")
        } catch (error) {
            return res.json({ message: "Ошибка при удалении пользователя", error: error.message })
        }
    }

    static async deleteAll(req, res) {
        try {
            await UserRepository.removeUsers()

            return res.redirect("/admin_panel")
        } catch (error) {
            return res.json({ message: "Ошибка при удалении всех пользователей", error: error.message })
        }
    }

    static async addProduct(req, res) {
        try {
            const { title, cost } = req.body
            await ProductRepository.createProduct(title, cost)

            return res.redirect("/admin_panel")
        } catch (error) {
            return res.json({ message: "Ошибка при добавлении нового продукта", error: error.message })
        }
    }
}

module.exports = PanelController