const mongoose = require("mongoose");

const { Schema } = mongoose;

const usuarioModel = Schema({
  nombre: { type: String },
  apellido: { type: String },
  edad: { type: Number },
  email: { type: String },
  foto_perfil: { type: String },
  password: { type: String },
  sessionID: { type: String },
  createAt: { type: Date },
  rol: { type: String },
  tituloAcademico: { type: String },
});

module.exports = mongoose.model("User", usuarioModel);
