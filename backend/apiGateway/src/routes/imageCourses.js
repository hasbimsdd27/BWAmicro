const express = require("express");
const router = express.Router();
const ImageCoursesHandler = require("../controller/imageCourses");

router.post("/", ImageCoursesHandler.Create);
router.delete("/:id", ImageCoursesHandler.Destroy);
module.exports = router;
