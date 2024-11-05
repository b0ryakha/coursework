const users = [];

class UserRepository {
  static findUserByEmail(email) {
    return users.find(user => user.email === email);
  }

  static createUser(email, password) {
    users.push({ email, password });
    return { email };
  }
}

module.exports = UserRepository;