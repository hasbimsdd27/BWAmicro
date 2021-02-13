const { User } = require("../../models");
const argon2 = require("argon2");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:6",
    profession: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).send({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({ where: { email: req.body.email } });

  if (user) {
    return res
      .status(409)
      .send({ status: "error", message: "email already exist" });
  }

  const password = await argon2.hash(req.body.password);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };

  const createdUser = await User.create(data);

  return res.send({ status: "success", data: { id: createdUser.id } });
};
