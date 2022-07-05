const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WmsSchema = new Schema({
    Folio: Number,
    rut: Number,
    dv: String,
    razon_social: String,
    giro: String,
    iva: { type: Boolean, default: false },
    CodigoImportadora: String,
    Descripcion: String,
    Cantidad: Number,
    CantidadRestante: Number,
    PrecioImportadora: Number,
    Usuario: String,
    Salida: {type: Boolean, default: false },
    Entrada: {type: Boolean, default: false },
    Devolucion: {type: Boolean, default: false },
    PrecioTotal: Number,
    Observaciones: String,
    Reajuste: Array,
    ReajusteUsuario: Array,
    Legacy: Boolean,
    CantidadTotal: Number,
    Registro: {type: Schema.Types.ObjectId, ref: 'wms'},
    Boleta: {type: Schema.Types.ObjectId, ref: 'boletas'},
    Factura: {type: Schema.Types.ObjectId, ref: 'facturas'},
  }, {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });


  //Se invoca los campos virtuales con .lean()
  WmsSchema.virtual('Producto', {
    ref: 'Productos', // The model to use
    localField: 'CodigoImportadora', // Find people where `localField`
    foreignField: 'CodigoImportadora', // is equal to `foreignField`
    justOne: true
  });

module.exports = mongoose.model('Wms', WmsSchema);