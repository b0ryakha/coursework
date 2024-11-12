const { Pool } = require("pg")

const pool = new Pool({
    host: "localhost",
    database: "postgres",
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
})

const createProductsTable = async () => {
    const query = `
        CREATE TABLE IF NOT EXISTS products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            cost NUMERIC(10, 2) NOT NULL,
            image_path VARCHAR(255)
        )
    `

    try {
        await pool.query(query)
    } catch (error) {
        console.error("Ошибка при создании таблицы продуктов:", error)
    }
}

createProductsTable()

process.on("SIGINT", async () => {
    await pool.end()
})

module.exports = pool