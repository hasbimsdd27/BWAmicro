const ServiceAdapter = require("../../serviceAdapter");
const { URL_SERVICE_ORDER_PAYMENT } = process.env;

const api = ServiceAdapter(URL_SERVICE_ORDER_PAYMENT);

module.exports = async (req, res) => {
  try {
    const userId = req.user.data.id;
    const orders = await api.get("/api/orders", {
      params: {
        user_id: userId,
      },
    });
    return res.send(orders.data);
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
