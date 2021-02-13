const ServiceAdapter = require("../../serviceAdapter");
const { URL_SERVICE_MEDIA } = process.env;

const api = ServiceAdapter(URL_SERVICE_MEDIA);

module.exports = async (req, res) => {
  try {
    const media = await api.get("/");
    return res.send(media.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
