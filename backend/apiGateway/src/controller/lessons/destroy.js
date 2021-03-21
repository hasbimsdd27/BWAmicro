const ServiceAdapter = require("../../serviceAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = ServiceAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const id = req.params.id;
    const lessons = await api.delete(`/api/lessons/${id}`);
    return res.send(lessons.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
