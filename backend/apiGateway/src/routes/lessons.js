const express = require("express");
const router = express.Router();
const LessonsController = require("../controller/lessons");

router.post("/", LessonsController.Create);
router.put("/:id", LessonsController.Update);
router.delete("/:id", LessonsController.Destroy);
router.get("/:id", LessonsController.Get);
router.get("/", LessonsController.GetAll);

module.exports = router;
