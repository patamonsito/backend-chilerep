const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BodegasSchema = new Schema({
  Sucursal: { type: Schema.Types.ObjectId, ref: 'Sucursales', required: true},
  Bodega: { type: String, required: true},
  FilaDesde: { type: Number, required: true},
  FilaHasta: { type: Number, required: true},
  ColumnaDesde: { type: Number, required: true},
  ColumnaHasta: { type: Number, required: true},
  NivelDesde: { type: Number, required: true},
  NivelHasta: { type: Number, required: true},
  },
  {
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Bodegas', BodegasSchema);