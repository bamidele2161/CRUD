let Userdb = require("../../model/RegisterModel");
let lodash = require("lodash");
let bcrypt = require("bcrypt");

//create and save new user
exports.register = async (req, res) => {
  //validate request
  if (!req.body) {
    res.status(400).send({ message: "Content cannot be empty" });
    return;
  }

  //new user
  const user = new Userdb({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    address: req.body.address,
    gender: req.body.gender,
  });

  let saltRound = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, saltRound);
  //save new user in the database
  Userdb.findOne({ email: req.body.email })
    .then((email) => {
      if (email) {
        res.status(404).send({ message: "User already exists" });
      } else {
        user
          .save(user)
          .then((data) => {
            const token = user.generateAuthToken();
            res
              .header("x-auth-token", token)
              .send(
                lodash.pick(data, [
                  "_id",
                  "firstName",
                  "lastName",
                  "email",
                  "password",
                  "address",
                  "gender",
                ])
              );
          })
          .catch((err) => {
            res.status(500).send({
              message:
                err.message ||
                "some error occureed whhile creating a create operation",
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error" });
    });
};

//retrieve and return all users/retrive and return a single user
exports.getProfile = (req, res) => {
  let id = req.params.id;
  if (id) {
    Userdb.findById(id)
      .select("-password")
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "some error occureed whhile" });
      });
  } else {
    Userdb.find()
      .select("-password")
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        res
          .status(500)
          .send({ message: err.message || "Error while retrieving users" });
      });
  }
};

//update a new identified user by user id
exports.updateUser = (req, res, next) => {
  if (!req.body) {
    res.status(404).send({ message: "Content cannot be empty" });
  }

  const id = req.params.id;
  console.log("id", id);
  Userdb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update user with ${id}. Maybe user not found`,
        });
      } else {
        res.status(200).send({ message: "User updated successfully" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: err.message || "Error Update user information" });
    });
};

//delete a user
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete user with . Maybe user not found`,
        });
      } else {
        res.send({
          message: "User was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error" });
    });
};

//login user
exports.login = async (req, res) => {
  if (!req.body)
    return res.status(400).send({ message: "Content cannot be empty" });

  if (req.body.password < 4)
    return res.status(400).send({ message: "minimum of 4 characters" });

  let checkEmail = await Userdb.findOne({ email: req.body.email });
  console.log(checkEmail);
  if (!checkEmail) return res.status(400).send({ message: "Invalid Email" });

  let checkPassword = await bcrypt.compare(
    req.body.password,
    checkEmail.password
  );

  if (!checkPassword)
    return res.status(400).send({ message: "Invalid Email or Password" });

  const token = checkEmail.generateAuthToken();
  res.status(200).send({
    token: token,
    data: lodash.pick(checkEmail, ["_id", "name", "email", "gender", "status"]),
    message: "Login successfully",
  });
};
