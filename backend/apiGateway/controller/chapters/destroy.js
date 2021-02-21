const ServiceAdapter = require("../../serviceAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = ServiceAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const chapter = await api.delete(`/api/chapters/${id}`);
    return res.send(chapter.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
