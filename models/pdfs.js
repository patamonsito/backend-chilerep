const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalesSchema = new Schema({
  // Informacion General
    Descripcion: String
},   {
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
});
module.exports = mongoose.model('Sucursales', SucursalesSchema);