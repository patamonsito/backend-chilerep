const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CredencialesSchema = new Schema({
  // Informacion General
    Importadora: {type: String, required: true },
    Cookie: String,
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Credenciales', CredencialesSchema);