const ServiceAdapter = require("../../serviceAdapter");
const { URL_SERVICE_COURSE } = process.env;

const api = ServiceAdapter(URL_SERVICE_COURSE);

module.exports = async (req, res) => {
  try {
    const mentor = await api.post("/api/mentors", req.body);
    return res.send(mentor.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
