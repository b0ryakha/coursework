const { Pool } = require("pg")

const pool = new Pool({
    host: "localhost",
    database: "postgres",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const createTestProducts = async () => {
    try {
        const result = await pool.query("SELECT COUNT(*) FROM products")
        const count = parseInt(result.rows[0].count)
        if (count != 0) return

        for (let i = 0; i < 5; i++) {
            const title = `Товар ${i + 1}`
            const cost = (Math.random() * 100).toFixed(2)
            await pool.query("INSERT INTO products (title, cost) VALUES ($1, $2)", [title, cost])
        }

    } catch (error) {
        console.error("Ошибка при добавлении продуктов:", error)
    }
}

const createProductsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            cost NUMERIC(10, 2) NOT NULL
        )
    `

    try {
        await pool.query(query)
        createTestProducts()
    } catch (error) {
        console.error("Ошибка при создании таблицы продуктов:", error)
    }
}

createProductsTable()

process.on("SIGINT", async () => {
    await pool.end()
})

module.exports = pool