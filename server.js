require("dotenv").config()

const express = require("express")
const morgan = require("morgan")
const fs = require("fs")
const path = require("path")
const helmet = require("helmet")
const cookies = require("cookie-parser")

const app = express()

morgan.token("remote_addr", (req) => req.ip || req.socket.remoteAddress)

const lstream = fs.createWriteStream(path.join(__dirname, "logs", "req.log"), { flags: "a" })
app.use(morgan(':remote_addr - - [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"', { stream: lstream }))

app.set("view engine", "ejs")
app.use(express.json())
app.use(cookies());
app.use(express.urlencoded({ extended: true }))
app.use(helmet())
app.use(express.static(path.join(__dirname, "public")));
app.use(require(path.join(__dirname, "routes", "routes")))

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})