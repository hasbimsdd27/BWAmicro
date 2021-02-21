const express = require("express");
const router = express.Router();
const CoursesController = require("../controller/courses");
const Middleware = require("../middlewares");

router.post("/", Middleware.VerifyToken, CoursesController.Create);
router.put("/:id", Middleware.VerifyToken, CoursesController.Update);
router.delete("/:id", Middleware.VerifyToken, CoursesController.Destroy);

router.get("/:id", CoursesController.Get);
router.get("/", CoursesController.GetAll);
module.exports = router;
