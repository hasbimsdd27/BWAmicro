const { Media } = require("../models");
const { SaveDataToFile, DeleteFile } = require("../utils");

exports.saveImage = async (req, res) => {
  const image = req.body.image;

  if (
    image.split(";")[0].indexOf("data") === -1 ||
    image.split(";")[0].indexOf("image") === -1
  ) {
    return res.status(400).send({ status: "error", message: "invalid base64" });
  }

  const imagePath = SaveDataToFile(image, "images");

  if (!!imagePath.message) {
    return res
      .status(400)
      .send({ status: "error", message: imagePath.message });
  }

  const media = await Media.create({ image: imagePath });

  return res.send({
    status: "success",
    message: "image saved",
    data: {
      id: media.id,
      image: `${
        req.get("host").indexOf("localhost") > -1 ? "https" : ""
      }${req.get("host")}/images/${media.image}`,
    },
  });
};

exports.getAllImages = async (req, res) => {
  const media = await Media.findAll({ attributes: ["id", "image"] });
  const mappedMedia = media.map((item) => {
    item.image = `${
      req.get("host").indexOf("localhost") > -1 ? "https" : ""
    }${req.get("host")}/images/${item.image}`;
    return item;
  });
  return res.send({ status: "success", data: mappedMedia });
};

exports.deleteImage = async (req, res) => {
  const id = req.params.id;

  const media = await Media.findByPk(id);

  if (!media) {
    return res
      .status(404)
      .send({ status: "error", message: "media not found" });
  }

  const status = DeleteFile(media.image, "images");
  console.log(status);
  if (status !== "success") {
    return res.status(400).send({ status: "error", message: status });
  }

  await media.destroy();

  return res.status(204).send({ status: "success" });
};
