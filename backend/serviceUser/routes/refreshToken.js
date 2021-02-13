const express = require("express");
const router = express.Router();

const RefreshTokenController = require("../controllers/refreshToken");

router.post("/", RefreshTokenController.Create);
router.get("/", RefreshTokenController.GetToken);
router.post("/logout", RefreshTokenController.Logout);

module.exports = router;
