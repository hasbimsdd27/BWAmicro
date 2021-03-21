const express = require("express");
const router = express.Router();
const APP_NAME = process.env.APP_NAME;

router.get("/", (req, res, next) => {
  res.send(APP_NAME);
});

module.exports = router;
