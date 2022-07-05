const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalesSchema = new Schema({
  // Informacion General
    Codigo: String,
    Nombre: String,
    Region: String,
    Comuna: String,
    Calle: String,
    Numeracion: String,
    Departamento: String,
    Active: { type: Boolean, default: true}
},   {
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
});
module.exports = mongoose.model('Sucursales', SucursalesSchema);