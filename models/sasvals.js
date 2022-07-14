const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SasvalsSchema = new Schema({
    Sku: String,
    CodigoProveedor: String,
    Descripcion: String,
    Precio: String,
    Marca: String,
    Modelo: String,
    Busqueda: String
},   {
    minimize: true,
    optimisticConcurrency: true,
    virtual: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Sasvals',SasvalsSchema);