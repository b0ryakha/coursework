const pool = require("../products_db")

class ProductRepository {
    static async createProduct(title, cost, image_path) {
        try {
            await pool.query("INSERT INTO products (title, cost, image_path) VALUES ($1, $2, $3)", [title, cost, image_path])
            return { title: title, cost: cost, image_path: image_path }
        } catch (error) {
            throw new Error("Ошибка при создании продукта: " + error.message)
        }
    }

    static async removeProductById(id) {
        try {
            await pool.query("DELETE FROM products WHERE id = $1", [id]);
        } catch (error) {
            throw new Error("Ошибка при удалении продукта: " + error.message)
        }
    }

    static async fetchProducts() {
        try {
            const result = await pool.query("SELECT id, title, cost, image_path FROM products")
            return result.rows
        } catch (error) {
            throw new Error("Ошибка при чтении продуктов: " + error.message)
        }
    }
}

module.exports = ProductRepository