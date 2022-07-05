const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CotizacionesSchema = new Schema({
   Receptor: String,
   Dte: Number,
   Codigo: String,
   Vendedor: String,
   Rut: String,
   Cliente: String,
   Monto: Number,
   Cantidad: Number,
   Detalles: Object
  },   {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });
module.exports = mongoose.model('Cotizaciones', CotizacionesSchema);