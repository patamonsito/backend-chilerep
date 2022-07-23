const mongoose = require('mongoose')
const Schema = mongoose.Schema

const MannheimSchema = new Schema({
  Descripcion: String,
  Fabricante: String,
  Img: String,
  Oem: String,
  Origen: String,
  Precio: Number,
  Url: String,
  Aplicacion: String,
  Extraido: Boolean,
  // Extras
  Marca: String,
  Modelo: String,
  SubModelo: String,
  AñoI: Number,
  AñoT: Number,
  Años: String,
  Busqueda: String
},{
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
})

module.exports = mongoose.model('Mannheim', MannheimSchema)