class MyRepository {
    async fetchData() {
      return [
        { id: 1, name: 'Item 1' },
        { id: 2, name: 'Item 2' },
      ];
    }
  }
  
  module.exports = MyRepository;
  