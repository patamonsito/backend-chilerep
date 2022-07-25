const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BicimotoSchema = new Schema({
    Descripcion: String,
    Marca: String,
    Modelo: String,
    Oem: String,
    Origen: String,
    PrecioImportadora: String,
    Sku: String,
    Stock: String,
    Busqueda: String
  },
  {
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Bicimoto', BicimotoSchema);