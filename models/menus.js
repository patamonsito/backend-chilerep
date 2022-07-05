const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MenusSchema = new Schema({
  // Informacion General
    Modo: String,
    Menu: Array
  },  {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Menus', MenusSchema);