const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;
  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send({ status: "error", message: err.message });
    }
    req.user = decoded;
    return next();
  });
};
