const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CuponesSchema = new Schema({
  // Informacion General
    Active: {type: Boolean, default: false },
    Descripcion: String
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Cupones', CuponesSchema);