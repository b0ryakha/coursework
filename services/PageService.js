const UserRepository = require("../repositories/UserRepository")

class PageService {
    static async getUsers() {
        const data = await UserRepository.fetchUsers()
        return data.sort((a, b) => a.role.localeCompare(b.role))
    }

    static async getUsers() {
        const data = await UserRepository.fetchUsers()
        return data.sort((a, b) => a.role.localeCompare(b.role))
    }
}

module.exports = PageService