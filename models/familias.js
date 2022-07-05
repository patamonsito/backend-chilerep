const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FamiliasSchema = new Schema({
  // Informacion General
  Descripcion: String,
  Img: String,
  active: Boolean
},  {
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
});

module.exports = mongoose.model('Familias', FamiliasSchema);