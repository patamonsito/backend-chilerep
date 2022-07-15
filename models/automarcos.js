const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AutomarcosSchema = new Schema({
  // Informacion General
Sku: String,
CodigoImportadora: String,
Descripcion: String,
Img: String, 
Marca: String,
Modelo: String,
Motor: String,
Aplicacion: String,
AñoI: Number,
AñoT: Number,
Fabricante: String,
FabricanteImg: String,
Años: Array,
Busqueda: String,
Extraido: Boolean
},  {
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
});

module.exports = mongoose.model('Automarcos', AutomarcosSchema);