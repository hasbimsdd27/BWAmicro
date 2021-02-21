const express = require("express");
const router = express.Router();
const MyCoursesHandler = require("../controller/myCourses");

router.post("/", MyCoursesHandler.Create);
router.get("/", MyCoursesHandler.Get);

module.exports = router;
