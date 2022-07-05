const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpresasSchema = new Schema({
    rut: Number,
    dv: String,
    razon_social: String,
    giro: String,
    actividad_economica: Number,
    telefono: String,
    email: String,
    direccion: String,
    comuna: String,
    modificado: String,
    contribuyente: String,
    config_email_intercambio_user: String,
    comuna_glosa: String,
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
    iva: { type: Boolean, default: false }
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Empresas', EmpresasSchema);