const router = require("express").Router()

const PageController = require("../controllers/PageController")
const AuthController = require("../controllers/AuthController")
const PanelController = require("../controllers/PanelController")
const Middleware = require("../middleware")

router.use(Middleware.contentUnlock)

router.get("/", Middleware.ident, PageController.catalog)
router.get("/admin_panel", Middleware.auth, PageController.adminPanel)
router.get("/authorization", PageController.authorization)
router.get("/registration", PageController.registration)
router.get("/order/:id", Middleware.auth, PageController.order)

router.post("/register", AuthController.register)
router.post("/login", AuthController.login)
router.post("/logout", AuthController.logout)
router.post("/delete_user/:id", Middleware.ident, PanelController.deleteUser)
router.post("/delete_all_users", Middleware.ident, PanelController.deleteAll)
router.post("/add_product", Middleware.ident, PanelController.addProduct)
router.post("/delete_product/:id", Middleware.ident, PanelController.deleteProduct)

module.exports = router