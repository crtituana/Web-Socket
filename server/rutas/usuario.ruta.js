;
'use strict'

const express = require('express');

let api = express.Router(),
  usuarioControl = require('../controlador/usuario.control');


api.post("/login", usuarioControl.loginUsers);

module.exports = api;
