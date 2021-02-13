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
    avatar: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate.length) {
    return res.status(400).send({ status: "error", message: validate });
  }

  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).send({ status: "error", message: "user not found" });
  }

  const email = req.body.email;
  if (email) {
    const checkEmail = await User.findOne({ where: { email } });

    if (checkEmail && email !== user.email) {
      return res
        .status(409)
        .send({ status: "error", message: "email already exist" });
    }
  }

  const password = await argon2.hash(req.body.password);
  const { name, profession, avatar } = req.body;

  await user.update({ email, password, name, profession, avatar });
  res.send({
    status: "success",
    data: { id: user.id, name, email, profession, avatar },
  });
};
