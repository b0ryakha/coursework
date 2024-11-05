const UserRepository = require("../repositories/UserRepository")

class MyService {
    static async getUsers() {
        return await UserRepository.fetchUsers()
    }
}

module.exports = MyService