const { Router } = require("express");
const { loginController, registerController, getCurrentUser } = require("../controllers/user");
const { checkForAuthenticationCookie } = require("../middlewares/authentication");

const router = Router();

router.post("/login", loginController)
router.post("/register", registerController)
router.get("/me", checkForAuthenticationCookie("token"), getCurrentUser)

module.exports = router;