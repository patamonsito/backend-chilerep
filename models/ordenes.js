const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrdenesSchema = new Schema({
  // Informacion General
  TipoDocumento: String,
  RutEmpresa: String,
  RazonSocialEmpresa: String,
  CorreoEmpresa: String,
  EntregaSeleccionada: String,
  Rut: String,
  Nombres: String,
  Apellidos: String,
  Telefono: String,
  RegionSeleccionada: String,
  Comuna: String,
  Calle: String,
  Numero: Number,
  Departamento: String,
  Correo: String,
  AgenciaSeleccionada: String,
  MetodoPago: String,
  FechaEntrega: String,
  Dia: String,
  FechaEntregaDate: Date,
  Orden: Number,
  Documento: { type: String, default: 'No Asignado' },
  //extras
  TBK_TOKEN: String,
  Retiro: Boolean,
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
  installments_number: Number,
},   {
  minimize: true,
  optimisticConcurrency: true,
  timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
});

module.exports = mongoose.model('Ordenes', OrdenesSchema);