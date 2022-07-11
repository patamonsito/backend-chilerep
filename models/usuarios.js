const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UsuariosSchema = new Schema({
    Usuario: String,
    Nombre: String,
    Rol: String,
    Apellido: String,
    Carrito: {type: Array, default: []},
    Rut: { type: String, unique: true, uppercase: true },
    Direccion: String,
    Telefono: String,
    Correo: { type: String, unique: true, lowercase: true },
    Contraseña: {type: String },
    Avatar: { type: String, default: 'default_avatar.png' },
    Autos: { type: Array, default: [] },
    Favoritos: { type: Array, default: [] },
    CuponesDisponibles: { type: Array, default: [] },
    CuponesUsados: { type: Array, default: [] },
    Compras: {type: Array, default: [] },
    LastLogin: Date,
    Bloqueado: { type: Boolean, default: false },
    BloqRazon: String,
    Token: String,
    CodeRef: String
},   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Usuarios', UsuariosSchema);