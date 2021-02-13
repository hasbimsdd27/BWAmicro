const express = require("express");
const router = express.Router();

const UserController = require("../controllers/user");

router.post("/register", UserController.Register);
router.post("/login", UserController.Login);
router.put("/update/:id", UserController.Update);
router.get("/:id", UserController.GetUser);
router.get("/", UserController.GetUsers);

module.exports = router;
