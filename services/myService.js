const MyRepository = require('../repositories/myRepository');
const myRepository = new MyRepository();

class MyService {
  async getAllData() {
    try {
        const data = await myRepository.fetchData();
      return data
    } catch (error) {
      throw new Error('Error fetching data');
    }
  }
}

module.exports = MyService;
