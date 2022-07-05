const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SlidersSchema = new Schema({
  // Informacion General
    Descripcion: String,
    Url: String
},   {
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
});

module.exports = mongoose.model('Sliders', SlidersSchema);