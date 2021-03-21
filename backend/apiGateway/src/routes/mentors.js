const express = require("express");
const router = express.Router();
const MentorsController = require("../controller/mentors");

router.get("/", MentorsController.GetAll);
router.get("/:id", MentorsController.Get);
router.post("/", MentorsController.Create);
router.put("/:id", MentorsController.Update);
router.delete("/:id", MentorsController.Destroy);

module.exports = router;
