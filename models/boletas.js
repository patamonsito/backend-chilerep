const mongoose = require('mongoose');
const { ObjectId } = require('mongoose/lib/schema/index');
const Schema = mongoose.Schema;

const BoletasSchema = new Schema({
    EntregaSeleccionada: String,
    Folio: Number,
    FechaEntrega: Date,
    NotaCreditoRef: { type: [ObjectId], Default: [] },
    Registros: { type: [ObjectId], Default: [] },
    RutEmpresa: String,
    TipoDocumento: String,
    RazonSocialEmpresa: String,
    CajaSeleccionada: String,
    CuentaBancariaSeleccionada: String,
    Titular: String,
    CorreoEmpresa: String,
    OrdenCompra: Number,
    InformacionPago: String,
    Observaciones: String,
    Rut: String,
    Nombres: String,
    Apellidos: String,
    Telefono: String,
    RegionSeleccionada: String,
    ComunaSeleccionada: String,
    Calle: String,
    Numero: String,
    Departamento: String,
    CorreoCliente: String,
    AgenciaSeleccionada: String,
    MetodoPagoSeleccionado: String,
    Usuario: String,
    Neto: Number,
    Iva: Number,
    PrecioTotal: Number,
    Carrito: Object,
    Detalles: Object,
    Receptor: Number,
    Dte: Number,
    Codigo: String,
    Temporal: Boolean,
    MontoTransferido: Number,
    MontoCaja: Number,
    MontoTransbank: Number,
  },  {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Boletas', BoletasSchema);