const express = require("express");
const authController = require("../controllers/auth.controller");
const { validateRegister } = require("../middleware/input_validation");
const { checkToken } = require("../middleware/token_validation")
const router = express.Router();

router.post("/sign-up", checkToken, validateRegister, authController.signUp);
router.post("/sign-in", authController.signIn);



router.get("/users", checkToken, authController.getAll);
router.get("/users/:id", checkToken, authController.getUserById);

module.exports = router;