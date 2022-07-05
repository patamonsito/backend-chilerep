const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ModelosSchema = new Schema({
  AñoI: Number,
  AñoT: Number,
  Años: [Number],
  CodigoMarcaVehiculo: Number,
  CodigoModelo: Number,
  Img: String,
  Modelo: String,
  Motor: String,
  Url: String,
  UrlAlsacia: String,
  UrlBicimoto: String,
  Buscador: String,
  MarcaVehiculo: String,
  LastUpdateRefax: Date,
  LastUpdateAlsacia: Date,
  LastUpdateBicimoto: Date,
  LastUpdateMannheim: Date,
  Vendidos: { type: Number, default: 0 }
},   {
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
});
module.exports = mongoose.model('Modelos', ModelosSchema);