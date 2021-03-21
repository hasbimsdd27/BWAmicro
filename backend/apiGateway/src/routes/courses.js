const express = require("express");
const router = express.Router();
const CoursesController = require("../controller/courses");
const Middleware = require("../middlewares");

router.post(
  "/",
  Middleware.VerifyToken,
  Middleware.Permission(["admin"]),
  CoursesController.Create
);
router.put(
  "/:id",
  Middleware.VerifyToken,
  Middleware.Permission(["admin"]),
  CoursesController.Update
);
router.delete(
  "/:id",
  Middleware.VerifyToken,
  Middleware.Permission(["admin"]),
  CoursesController.Destroy
);

router.get("/:id", CoursesController.Get);
router.get("/", CoursesController.GetAll);
module.exports = router;
