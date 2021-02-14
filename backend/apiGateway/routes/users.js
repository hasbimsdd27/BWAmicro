const express = require("express");
const router = express.Router();
const UserController = require("../controller/user");
const Middleware = require("../middlewares");

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.put("/", Middleware.VerifyToken, UserController.Update);
router.get("/", Middleware.VerifyToken, UserController.GetUser);
router.post("/logout", Middleware.VerifyToken, UserController.Logout);

module.exports = router;
