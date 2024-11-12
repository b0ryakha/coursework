const UserRepository = require("../repositories/UserRepository")
const ProductRepository = require("../repositories/ProductRepository")

class PageService {
    static async users() {
        const data = await UserRepository.fetchUsers()
        return data.sort((a, b) => a.role.localeCompare(b.role))
    }

    static async products() {
        const data = await ProductRepository.fetchProducts()
        return data.sort((a, b) => a.role.localeCompare(b.role))
    }
}

module.exports = PageService