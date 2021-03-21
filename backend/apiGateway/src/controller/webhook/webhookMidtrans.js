const ServiceAdapter = require("../../serviceAdapter");
const { URL_SERVICE_ORDER_PAYMENT } = process.env;

const api = ServiceAdapter(URL_SERVICE_ORDER_PAYMENT);

module.exports = async (req, res) => {
  try {
    const webhook = await api.post("/api/webhook", req.body);
    return res.send(webhook.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
