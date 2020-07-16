;
'use strict'

const User = require('../modelos/usuario.Model'),
  bcrypt = require('bcrypt'),
  jwt = require('jsonwebtoken');

let loginUsers = (req, res) => {
  let { data } = req.body,
    email = data.email,
    password = data.password;

  User.find({ email })
    .then((data) => {
      let token,
        tokenBody = {
          nombre: data[0].nombre,
          email: data[0].email,
          rol: data[0].rol,
          sessionID: data[0].sessionID,
        };

      bcrypt.compareSync(password, data[0].password)
        ? ((token = jwt.sign({ data: tokenBody }, process.env.KEY_JWT, {
            algorithm: "HS256",
            expiresIn: 300,
          })),
          res.status(200).json({
            ok: true,
            data: null,
            msg: "Usuario registrado",
            token,
          }))
        : res.status(404).json({
            ok: false,
            data: null,
            msg: 'Clave invalida ingresar nuevamente',
            token: null,
          });
    })
    .catch((err) => {
      res.status(404).json({
        ok: false,
        data: null,
        msg: 'Email no registrado',
      });
    });
};

module.exports = {
  loginUsers,
};
