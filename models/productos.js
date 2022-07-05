const mongoose = require('mongoose');
const { ObjectId } = require('mongoose/lib/schema/index');
const Schema = mongoose.Schema;

const ProductosSchema = new Schema({
  // Informacion General
  Importadora: { type: String, required: true },
  CodigoImportadora: String,
  CodigoModelo: { type: Number, required: true },
  CodigoProducto: { type: String, required: true },
  OEM: String,
  Descripcion: { type: String, required: true },
  Origen: String,
  Marca: String,
  Familia: String,
  Categoria: String,
  MarcaVehiculo:{ type: String, required: true },
  Modelo: { type: String, required: true },
  AñoI: { type: Number, required: true },
  AñoT: { type: Number, required: true },
  Stock: { type: Schema.Types.Mixed, required: true },
  Oferta: Boolean,
  Img: String,
  PrecioImportadora: Number,
  HaveImg: Boolean,
  Descuento: Number,
  Descuento: Number,
  BuscadorFront: String,
  BuscadorBack: String,
  Vendidos: Number,
  Retiro: Boolean,
  CurrentImg: String,
  Bodega: {type: Number, default: 0},
  Ubicacion: {type: [Object], default: [{
    Bodega: null,
    Fila: null,
    Columna: null,
    Nivel: null,
    Filas: [],
    Columnas: [],
    Niveles: []
}]},
  Marketplace: {type: Boolean, default: false},
  Legacy: Boolean,
  Registros: { type: [ObjectId], Default: [] },
},   {
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
});

ProductosSchema.virtual('Busqueda').
get(function() { return `${this.CodigoImportadora} ${this.CodigoProducto} ${this.OEM} ${this.Descripcion} ${this.Origen} ${this.Marca} ${this.Familia} ${this.Categoria} ${this.MarcaVehiculo} ${this.Modelo} ${this.AñoI} ${this.AñoT} ${this.Stock} ${this.Oferta} ${this.Img}`; })



module.exports = mongoose.model('Productos', ProductosSchema);