const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const NotaCreditosSchema = new Schema({
    Folio: Number,
    Detalles: Object,
    Receptor: Number,
    Dte: Number,
    Codigo: String,
    Temporal: Boolean,
    Offline: Boolean,
    Boleta: {type: Schema.Types.ObjectId, ref: 'boletas'},
    Factura: {type: Schema.Types.ObjectId, ref: 'facturas'},
    //dte recibido del SII
    CodeNotaCredito: String,
    RazonNotaCredito: String,
    anulado: Number,
    certificacion: Number,
    datos_dte: Object,
    detalle: [Object],
    dte: Number,
    emisor: Number,
    estado: String,
    fecha: Date,
    fecha_hora_creacion: Date,
    folio: Number,
    iva: Number,
    iva_fuera_plazo: Number,
    neto: Number,
    receptor: Object,
    revision_detalle: String,
    revision_estado: String,
    tasa: Number,
    tipo: Object,
    total: Number,
    track_id: Number
  },  {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('NotaCreditos', NotaCreditosSchema);