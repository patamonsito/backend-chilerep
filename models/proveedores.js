const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProveedoresSchema = new Schema({
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
    iva: { type: Boolean, default: false }
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });
module.exports = mongoose.model('Proveedores', ProveedoresSchema);