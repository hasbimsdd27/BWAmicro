const ServiceAdapter = require("../../serviceAdapter");
const jwt = require("jsonwebtoken");
const {
  URL_SERVICE_USER,
  JWT_SECRET,
  JWT_SECRET_REFRESH_TOKEN,
  JWT_ACCESS_TOKEN_EXPIRED,
  JWT_REFRESH_TOKEN_EXPIRED,
} = process.env;

const api = ServiceAdapter(URL_SERVICE_USER);

module.exports = async (req, res) => {
  try {
    const user = await api.post("/login", req.body);
    const data = user.data.data;

    const token = jwt.sign({ data }, JWT_SECRET, {
      expiresIn: JWT_ACCESS_TOKEN_EXPIRED,
    });
    const refreshToken = jwt.sign({ data }, JWT_SECRET_REFRESH_TOKEN, {
      expiresIn: JWT_REFRESH_TOKEN_EXPIRED,
    });

    await api.post("/refresh_token", {
      refresh_token: refreshToken,
      user_id: data.id,
    });

    return res.send({
      status: "success",
      data: {
        token,
        refresh_token: refreshToken,
      },
    });
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      return res
        .status(500)
        .send({ status: "error", message: "service unavailable" });
    }
    return res.status(error.response.status).send(error.response.data);
  }
};
