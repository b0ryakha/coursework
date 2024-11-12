const router = require("express").Router()
const jwt = require("jsonwebtoken")

const PageController = require("../controllers/PageController")
const AuthController = require("../controllers/AuthController")
const PanelController = require("../controllers/PanelController")

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return res.sendStatus(401)

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

router.get("/", PageController.main)
router.get("/admin_panel.ejs", authMiddleware, PageController.adminPanel)
router.get("/authorization.ejs", PageController.authorization)
router.get("/registration.ejs", PageController.registration)

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/delete_user/:id", PanelController.deleteUser)
router.post("/delete_all_users", PanelController.deleteAll)

module.exports = router