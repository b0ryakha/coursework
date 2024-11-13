const router = require("express").Router()
const jwt = require("jsonwebtoken")

const PageController = require("../controllers/PageController")
const AuthController = require("../controllers/AuthController")
const PanelController = require("../controllers/PanelController")

// f*** security
router.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://getbootstrap.com;")
    next()
});

const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if (!token) return next()

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (!err) req.user = user
        next()
    })
}

router.get("/", authMiddleware, PageController.catalog)
router.get("/admin_panel", authMiddleware, PageController.adminPanel)
router.get("/authorization", PageController.authorization)
router.get("/registration", PageController.registration)

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)
router.post("/delete_user/:id", authMiddleware, PanelController.deleteUser)
router.post("/delete_all_users", authMiddleware, PanelController.deleteAll)
router.post("/add_product", authMiddleware, PanelController.addProduct)

module.exports = router