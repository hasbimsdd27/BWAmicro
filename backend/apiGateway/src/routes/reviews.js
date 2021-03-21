const express = require("express");
const router = express.Router();
const ReviewsController = require("../controller/reviews");

router.post("/", ReviewsController.Create);
router.put("/:id", ReviewsController.Update);
router.delete("/:id", ReviewsController.Destroy);

module.exports = router;
