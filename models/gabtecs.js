const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GabtecsSchema = new Schema({
    CodigoImportadora: String,
    Descripcion: String,
    Marca: String,
    Modelo: String,
    Posicion: String,
    AñoI: Number,
    AñoT: Number,
    Años: Array,
    Fabricante: String,
    Busqueda: String,
    Img: String,
    Extraido: Boolean,
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Gabtecs', GabtecsSchema);