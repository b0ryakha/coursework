const MyService = require('../services/myService');
const myService = new MyService();

class MyController {
  async getAll(req, res) {
    try {
      const data = await myService.getAllData();
      res.render('index', { data });
    } catch (error) {
      res.status(500).send('Error loading page');
    }
  }
}

module.exports = new MyController();
