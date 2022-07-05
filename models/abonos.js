const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AbonosSchema = new Schema({
    GiroEmpresa: String,
    DireccionEmpresa: String,
    ComunaEmpresa: String,
    EntregaSeleccionada: String,
    FechaEntrega: Date,
    RutEmpresa: String,
    TipoDocumento: String,
    RazonSocialEmpresa: String,
    CajaSeleccionada: String,
    CuentaBancariaSeleccionada: String,
    MontoTransferido: Number,
    MontoCaja: Number,
    MontoTransbank: Number,
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
    Temporal: Boolean
  },  {
    minimize: true,
    optimisticConcurrency: true,
    timestamps: { currentTime: () => Date.now('es-CL', { timeZone: 'America/Santiago' })} 
  });

module.exports = mongoose.model('Abonos', AbonosSchema);