const { RefreshToken } = require("../../models");

module.exports = async (req, res) => {
  const refreshToken = req.query.refresh_token;
  const token = await RefreshToken.findOne({ where: { token: refreshToken } });
  if (!token) {
    return res.status(400).send({ status: "error", message: "invalid token" });
  }

  return res.send({ status: "success", data: token });
};
