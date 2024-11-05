const router = require("express").Router()
const jwt = require("jsonwebtoken")

const MyController = require("../controllers/MyController")
const AuthController = require("../controllers/AuthController")

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

router.get("/", MyController.getMain)
router.get("/protected", authMiddleware, MyController.getProtected)
router.post("/register", AuthController.register)
router.post("/login", AuthController.login)

module.exports = router