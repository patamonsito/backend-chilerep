const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LineasSchema = new Schema({
  // Informacion General
    Descripcion: String,
    Img: String,
    Enable: Boolean
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Lineas', LineasSchema);