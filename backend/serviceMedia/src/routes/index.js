const express = require("express");
const router = express.Router();
const {
  saveImage,
  getAllImages,
  deleteImage,
} = require("../controllers/imageController");

router.post("/", saveImage);
router.get("/", getAllImages);
router.delete("/:id", deleteImage);

module.exports = router;
