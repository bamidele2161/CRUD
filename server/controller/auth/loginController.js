let Registerdb = require("../../model/RegisterModel");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");
const Userdb = require("../../model/RegisterModel");

//login user
exports.login = async (req, res) => {
  if (!req.body)
    return res.status(400).send({ message: "Content cannot be empty" });

  if (req.body.password < 4)
    return res.status(400).send({ message: "minimum of 4 characters" });

  let checkEmail = await Registerdb.findOne({ email: req.body.email });

  if (!checkEmail)
    return res.status(400).send({ message: "Invalid Emailsssss or Password" });

  let checkPassword = await bcrypt.compare(
    req.body.password,
    checkEmail.password
  );

  if (!checkPassword)
    return res
      .status(400)
      .send({ message: "Invalid Emailsssss or Passwordsss" });

  const token = checkEmail.generateAuthToken();
  res.send(token);
};
