const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarcasSchema = new Schema({
  // Informacion General
    Descripcion: String,
    Img: String,
    CodigoMarcaVehiculo: Number,
    Enable: Boolean
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });
module.exports = mongoose.model('Marcas', MarcasSchema);