const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ClientesSchema = new Schema({
    Rut: String,
    Nombres: String,
    Apellidos: String,
    Telefono: Number,
    Correo: String,
    Comuna: String,
    Calle: String,
    Numero: Number,
    RegionSeleccionada: String,
    Departamento: String,
    Agencia: String,
    CountCompras: Number,
    MetodoPagoSeleccionado: String,
    AgenciaSeleccionada: String,
    CajaSeleccionada: String,
    CuentaBancariaSeleccionada: String,
    EntregaSeleccionada: String,
    ComunaSeleccionada: String,
    CorreoCliente: String,
    Titular: String,
    Compras: [String],
    Favoritos: [String],
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Clientes', ClientesSchema);