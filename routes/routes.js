const express = require('express');
const router = express.Router();
const API = require('../controllers/api')
const multer = require('multer')
const uploadImgRepuesto = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/repuestos")
    },
    filename: function(req, file, cb){
        cb(null, file.originalname + '.jpg');
    },
});
//multer middleware
let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, "./uploads/avatars")
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
});

let upload_avatars = multer({
    storage: storage,
}).single("Avatar");


let upload_imgRepuesto = multer({
    storage: uploadImgRepuesto,
}).single("file");


//USERS CRUD + BLOCK AND UNBLOCK
router.post('/user', upload_avatars, API.CREATE_USER);
router.post('/user-login', API.USER_LOGIN);
router.get('/logout', API.GET_LOGOUT);
router.get('/users', API.GET_USERS);
router.get('/user/:id', API.GET_USER_BY_ID);
router.patch('/user/:id', upload_avatars, API.UPDATE_USER);
router.delete('/user/:id', API.DELETE_USER);
router.lock('/user/:id', API.BLOCK_USER);
router.unlock('/user/:id', API.UNBLOCK_USER);
router.post('/user_token', API.GET_USER_TOKEN);
//USER ADMIN USER_LOGIN_ADMIN
router.post('/user-login_admin', API.USER_LOGIN_ADMIN);
router.post('/user_token_admin', API.GET_USER_TOKEN_ADMIN);


//API IMPORTADORA
router.post('/products/api-importadora', API.POST_API_IMPORTADORA);
router.post('/auth-refax', API.POST_REFAX_AUTH);
router.post('/auth-bicimoto', API.POST_BICIMOTO_AUTH);
router.post('/auth-noriega', API.POST_NORIEGA_AUTH);
router.post('/api-refax', API.POST_API_REFAX);
router.post('/api-alsacia', API.POST_API_ALSACIA);
router.post('/api-bicimoto', API.POST_API_BICIMOTO);
router.post('/api-mannheim', API.POST_API_MANNHEIM);
router.post('/api-noriega', API.POST_API_NORIEGA);
router.post('/api-cuatro-ruedas', API.POST_API_CUATRORUEDAS);
router.post('/aplicaciones-m', API.POST_APLICACIONESM);


//PRODUCTOS CRUD
router.post('/products/create-many', API.POST_CREATEPRODUCTS)
router.post('/products-code', API.POST_PRODUCTS_CODE)
router.get('/products/:CodigoModelo/:page', API.GET_PRODUCTS_BY_MODELOID);
router.get('/product/:id', API.GET_PRODUCT_BY_ID);
router.post('/products', API.POST_PRODUCT_SEARCH);
router.get('/product-off/:page', API.GET_PRODUCTS_OFF);
// router.get('/productos', API.GET_PRODUCTS);
router.post('/products-linea', API.POST_LINEA_SEARCH)
//Update PRODUCT_CHANGE_DESCRIPCTION
router.post('/products-description', API.PRODUCT_CHANGE_DESCRIPCTION)
router.post('/product-marketplace', API.PRODUCT_MARKETPLACE)
// router.get('/productos/:id', API.GET_PRODUCTS_SEARCH);
//ELIMINAR DATOS
router.delete('/products/delete-all', API.DELETE_ALLPRODUCTS);
router.delete('/products/delete-one/:id', API.DELETE_PRODUCTBYID);
router.delete('/products/delete-many/:CodigoImportadora', API.DELETE_PRODUCTBYCI);
router.delete('/products/delete-mannheim', API.DELETE_PRODUCTSMANNHEIM);
router.delete('/products/delete-refax', API.DELETE_PRODUCTSREFAX);
router.delete('/products/delete-alsacia', API.DELETE_PRODUCTSALSACIA);
router.delete('/products/delete-bicimoto', API.DELETE_PRODUCTSBICIMOTO);

//MARCAS CRUD
router.get('/marcas', API.GET_MARCAS);


//MODELOS CRUD
router.get('/models', API.GET_MODELS);
router.get('/models/:id', API.GET_MODELSBYMARCA);
router.get('/model/:id', API.GET_MODEL);
router.post('/models_search', API.POST_MODELS_SEARCH);
router.post('/count-products-by-models', API.POST_COUNT_PRODUCT_BY_MODELS);
//FAMILIAS CRUD
router.get('/families', API.GET_FAMILIES);
//MENU CRUD
router.get('/menu_auth/:session', API.GET_MENU);
//SLIDERS CRUD
router.get('/sliders', API.GET_SLIDERS);
//LINEAS CRUD
router.get('/lineas', API.GET_LINEAS);



//UPDATE DATOS
router.get('/update-all', API.POST_UPDATEALL)
router.post('/update-alsacia', API.POST_UPDATEALSACIA)
router.post('/update-bicimoto', API.POST_UPDATEBICIMOTO)
router.post('/update-refax', API.POST_UPDATEREFAX)
router.post('/update-mannheim', API.POST_UPDATEMANNHEIM)
router.get('/update-produtos-custom', API.POST_UPDATEPRODUCTOSCUSTOM)


//UNSET CAMPOS
router.get('/unset-all', API.POST_UNSETALL)
router.get('/unset-alsacia', API.GET_UNSETALSACIA)
router.get('/unset-bicimoto', API.GET_UNSETBICIMOTO)
router.get('/unset-mannheim', API.GET_UNSETMANNHEIM)
router.get('/unset-refax', API.GET_UNSETREFAX)


//Control de imagenes
router.get('/have-img', API.GET_HAVEIMG)
router.post('/img-controller', API.IMG_CONTROLLER)
router.post('/upload-img-repuesto', upload_imgRepuesto, API.UPLOAD_IMG_REPUESTO);

//REGIONES_LIST - GET_REGIONES, POST_COMUNA

router.get('/get-regiones', API.GET_REGIONES,)
router.post('/post-comuna', API.POST_COMUNA)

//CARRITO - ADD_TO_CART
router.get('/get-carrito', API.GET_CERRITO_SESSION)
router.post('/add-cart', API.ADD_TO_CART)
router.post('/update-carrito', API.UPDATE_CART)
router.post('/remove-cart', API.REMOVE_TO_CART)
router.post('/guardar-orden', API.POST_SAVEORDEN)
router.post('/orden', API.POST_ORDEN)

//Session
router.delete('/delete-session', API.DELETE_SESSION);

//webpay
router.post('/start-webpay', API.POST_WEBPAY)
router.post('/restart-webpay', API.POST_RETRY_WEBPAY)
router.post('/res-webpay', API.POST_WEBPAY_RETURN)


//validar rut
router.post('/validar-rut', API.POST_RUTEMPRESA)

//clientes
router.get('/get-client/:Rut', API.GET_CLIENT)

//Proveedores
router.get('/get-proveedores', API.GET_PROVEEDORES)
router.get('/get-proveedor/:id', API.GET_PROVEEDOR)
router.post('/crear-proveedor', API.CREAR_PROVEEDOR)
router.post('/update-proveedor', API.UPDATE_PROVEEDOR)
router.delete('/delete-proveedor/:rut', API.ELIMINAR_PROVEEDOR)

//Bodegas
router.get('/get-bodegas', API.GET_BODEGAS)
router.get('/get-bodega/:id', API.GET_BODEGA)
router.post('/crear-bodega', API.CREAR_BODEGA)
router.post('/update-bodega', API.UPDATE_BODEGA)
router.delete('/delete-bodega/:Bodega', API.ELIMINAR_BODEGA)



//Sucursales
router.get('/get-sucursales', API.GET_SUCURSALES)
router.get('/get-sucursal/:id', API.GET_SUCURSAL)
router.post('/crear-sucursal', API.CREAR_SUCURSAL)
router.post('/update-sucursal', API.UPDATE_SUCURSAL)
router.delete('/delete-sucursal/:id', API.ELIMINAR_SUCURSAL)



//WMS
router.get('/get-registros', API.GET_REGISTROS)
router.get('/get-registro/:id', API.GET_REGISTRO)
router.post('/crear-registro', API.CREAR_REGISTRO)
router.post('/update-registro', API.UPDATE_REGISTRO)
router.delete('/delete-registro/:id', API.ELIMINAR_REGISTRO)

//LINK IMAGENES
router.post('/create-link', API.POST_CREATELINK)

//FACTURACION
router.post('/emitir-documento', API.POST_EMITIR_DOCUMENTO)

//API VENTAS
router.get('/obtener-documentos', API.GET_DOCUMENTOS)
router.post('/obtener-documento', API.POST_DOCUMENTO)
router.post('/obtener-documentos', API.POST_DOCUMENTOS)

// DEVOLUCIONES
router.post('/realizar-nota-credito', API.POST_NOTACREDITO)

//TEST
router.get('/test', API.GET_TEST)
router.get('/testdos', API.GET_TESTDOS)
router.get('/testtres', API.GET_TESTTRES)
router.get('/imagecode', API.GET_IMAGENCODE)
router.get('/stockcero', API.STOCKSTRING)
router.get('/descripcion-edit', API.DESCRIPCIONEDIT)
router.get('/bicimoto-oem', API.BICIMOTOOEM)
router.post('/precio-mercado', API.PRECIOMERCADO)
router.get('/export', API.EXPORT);
router.get('/update-all-documents', API.UPDATE_ALL_DOCUMENTS)

//API DTE
router.post('/post-dte-compra', API.POST_DTE_COMPRA)


//GENERAR PDF
router.get('/certificado/:certificado/:id/:dte', API.GENERAR_PDF)


//API SII
router.get('/get-timbre', API.GET_TIMBRE)


module.exports = router;