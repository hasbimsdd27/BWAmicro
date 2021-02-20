const { User } = require("../../models");

module.exports = async (req, res) => {
  const id = req.params.id;
  const user = await User.findByPk(id, {
    attributes: ["id", "name", "email", "role", "profession", "avatar"],
  });

  if (!user) {
    return res.status(404).send({ status: "error", message: "user not found" });
  }

  return res.status(200).send({ status: "success", data: user });
};
