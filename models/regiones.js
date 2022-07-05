const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RegionesSchema = new Schema({
    Region: String,
    NumeroRomano: String,
    Numero: String,
    Abreviacion: String,
    Comunas: Array
},   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Regiones',RegionesSchema);