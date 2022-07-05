const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VentasSchema = new Schema({
  // Informacion General
    TBK_TOKEN: String,
    Importadora: String,
    CodigoProducto: String,
    CodigoImportadora: String,
    Descripcion: String,
    Marca: String,
    Origen: String,
    Cantidad: Number,
    OEM: String,
    Modelo: String,
    Img: String,
    Retiro: Boolean,
    Precio: Number,
    Total: Number,
    TotalNeto: Number,
    Orden: Number,
    vci: String,
    amount: Number,
    status: String,
    buy_order: String,
    session_id: String,
    card_detail: Object,
    accounting_date: String,
    transaction_date: Date,
    authorization_code: String,
    payment_type_code: String,
    response_code: Number,
    installments_number: Number
},   {
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
});

module.exports = mongoose.model('Ventas', VentasSchema);