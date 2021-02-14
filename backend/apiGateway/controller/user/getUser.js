const ServiceAdapter = require("../../serviceAdapter");
const { URL_SERVICE_USER } = process.env;

const api = ServiceAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const id = req.user.data.id;
    const user = await api.get(`/${id}`);
    return res.send(user.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
