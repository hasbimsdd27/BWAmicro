const express = require("express");
const router = express.Router();
const ChaptersController = require("../controller/chapters");

router.post("/", ChaptersController.Create);
router.put("/:id", ChaptersController.Update);
router.delete("/:id", ChaptersController.Destroy);
router.get("/:id", ChaptersController.Get);
router.get("/", ChaptersController.GetAll);

module.exports = router;
