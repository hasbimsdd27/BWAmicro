const express = require("express");
const router = express.Router();
const RefreshTokenController = require("../controller/refreshToken");

router.post("/", RefreshTokenController.RefreshToken);

module.exports = router;
