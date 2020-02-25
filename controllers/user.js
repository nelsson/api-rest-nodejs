"use strict";

const User = require("../models/user");
const service = require("../services");
function signUp(req, res) {
  console.log("newREQ", req.body);
  const user = new User({
    email: req.body.email,
    displayName: req.body.displayName,
    password: req.body.password
  });

  user.save(err => {
    console.log("token", service.createToken(user));
    if (err)
      res.status(500).send({ message: `Error al crear el usuario:${err}` });
    return res.status(201).send({ token: service.createToken(user) });
  });
}

function signIn(req, res) {
  User.find({ email: req.body.email }, (err, user) => {
    if (err) return res.status(500).send({ message: err });
    if (!user) return res.status(404).send({ message: "No existe el usuario" });

    res.user = user;
    res.status(200).send({
      message: "Te haz logueado correctamente",
      token: service.createToken(user)
    });
  });
}

function getUsers(req, res) {
  User.find({}, (err, users) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al realizar la peticion ${err}` });
    if (!users) return res.status(404).send({ message: "No existe usuarios" });

    res.send(200, { users });
  });
}

function deleteUser(req, res) {
  let userId = req.params.userId;
  User.findById(userId, (err, user) => {
    if (err)
      return res
        .status(500)
        .send({ message: `Error al borrar el usuario ${err}` });

    if (!user) return res.status(400).send({ message: `El User no existe` });

    // res.status(400).send({ product: product });  se puede poner de las dos formas con es6 se reduce:
    user.remove(err => {
      if (err)
        return res
          .status(500)
          .send({ message: `Error al borrar el user ${err}` });
      res.status(200).send({ message: "El user ha sido eliminado" });
    });
  });
}
module.exports = {
  signIn,
  signUp,
  getUsers,
  deleteUser
};
