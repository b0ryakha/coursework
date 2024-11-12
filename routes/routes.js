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

router.get("/", authMiddleware, PageController.catalog)
router.get("/admin_panel.ejs", authMiddleware, PageController.adminPanel)
router.get("/authorization.ejs", authMiddleware, PageController.authorization)
router.get("/registration.ejs", authMiddleware, PageController.registration)
router.get("/basket.ejs", authMiddleware, PageController.basket)

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/delete_user/:id", PanelController.deleteUser)
router.post("/delete_all_users", PanelController.deleteAll)
router.post("/add_product", PanelController.addProduct)

module.exports = router