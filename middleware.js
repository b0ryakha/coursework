const jwt = require("jsonwebtoken")

class Middleware {
    static async auth(req, res, next) {
        const token = req.cookies.token
        if (!token) return res.status(401).json("Пользователь не авторизован")

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) return res.status(403).json("Пользователь не авторизован")
            req.user = user
            next()
        })
    }

    static async ident(req, res, next) {
        const token = req.cookies.token
        if (!token) return next()

        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (!err) req.user = user
            next()
        })
    }

    static async contentUnlock(req, res, next) {
        res.setHeader("Content-Security-Policy", "script-src 'self' https://getbootstrap.com;")
        next()
    }
}

module.exports = Middleware