const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoliosSchema = new Schema({
    Orden: Number,
    Session: Number,
    Referencia: String
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Folios', FoliosSchema);