const Usuarios = require("../models/usuarios");
const Modelos = require("../models/modelos");
const Familias = require("../models/familias");
const Credenciales = require("../models/credenciales");
const Gabtec = require("../models/gabtecs");
const Mannheim = require("../models/mannheim");
const Bicimoto = require("../models/bicimoto");
const Automarcos = require("../models/automarcos")
const HtmlTableToJson = require('html-table-to-json');
const Sucursales = require("../models/sucursales");
const Bodegas = require("../models/bodegas");
const Registros = require("../models/wms");
const Menus = require("../models/menus");
const Marcas = require("../models/marcas");
const Lineas = require("../models/lineas");
const Sliders = require("../models/sliders");
const Ventas = require("../models/ventas");
const Folios = require("../models/folios");
const Clientes = require("../models/clientes");
const Ordenes = require("../models/ordenes");
const Empresas = require("../models/empresas");
const Proveedores = require("../models/proveedores");
const Regiones = require("../models/regiones");
const Productos = require("../models/productos");
const Sasval = require("../models/sasvals");
const Cotizaciones = require("../models/cotizaciones");
const NotaCreditos = require("../models/notacreditos");
const Boletas = require("../models/boletas");
const Facturas = require("../models/facturas");
const Abonos = require("../models/abonos");
var cron = require('node-cron');
const genPDF = require("../models/pdf");
var json2xls = require('json2xls');
const request = require('request').defaults({
    jar: jar,
    followAllRedirects: true
  });
var jar = request.jar();
const path = require('path');
const fs = require("fs");
const replaceAll = require("replaceall");
const bcrypt = require("bcrypt");
const { env } = require("process");
const e = require("express");
require("dotenv").config();
const Environment = require('transbank-sdk').Environment;
const WebpayPlus = require('transbank-sdk').WebpayPlus;
const cheerio = require('cheerio');
const Socket = require('../socket').socket;
const PNG = require("pngjs").PNG;
const pngToJSON = require('png-to-json');
// original
// WebpayPlus.commerceCode = 597035848711;
// WebpayPlus.apiKey = 'eabacfa4f17f556d5e218aee1f4b85d1';
// WebpayPlus.environment = Environment.Production;

//Integracion
WebpayPlus.commerceCode = 597055555532;
WebpayPlus.apiKey = '579B532A7440BB0C9079DED94D31EA1615BACEB56610332264630D42D0A36B1C';
WebpayPlus.environment = Environment.Integration;


// cron.schedule('*/1 * * * * *', async () => {
//     try {

//         let MannheimCode = await Mannheim.findOne({ Extraido: false }).sort({_id: 1});

//         if(!MannheimCode){
//             return res.send('sin resultados');
//         }
        
//         await Mannheim.updateOne({ _id: MannheimCode._id },{$set: { Extraido: true }});


//         var options = { method: 'GET',
//         url: 'https://repuestos.buscalibre.cl/v2/repuestos/aplicaciones/'+ MannheimCode.Aplicacion,
//         headers: { 'cache-control': 'no-cache' } };
//         request(options, async function (error, response, body) {
//         if (error) throw new Error(error);

//             console.log(body);

//         let aplicaciones = JSON.parse(body)

//             if(aplicaciones.aplicaciones.length == 0){
//              await Mannheim.updateOne({ _id: MannheimCode._id },{$set: { AñoI: 0, AñoT: 0, Años: '0 al 0', Marca: 'Consultar', Modelo: 'consultar', Extraido: true, Busqueda: MannheimCode.Descripcion + ' ' + MannheimCode.Fabricante + ' ' + MannheimCode.Origen + ' '  + MannheimCode.Oem }})
//              return true;
//             }


//             let Modelos = [];
//             let CathModelo;
//             let CathMarca;
//             let CathAño;
//             let Comprobar = false;

//         aplicaciones = aplicaciones.aplicaciones.map((e, i) => {
//             let Base = replaceAll(',', '', e.title_unico);
//             let SubModelo = Base.split(' ');
//             e.Marca = e.marca
//             let prueba = e.motor.split('');
//             if(prueba.includes('.')){
//                 e.Modelo = (e.modelo + ' ' + e.motor.split('.')[0].slice(-1)+'.' + e.motor.split('.')[1].slice(0, 1) + ' ' +
//                 (SubModelo.includes('Hatchback') ? 'Hatchback ' : '') +
//                 (SubModelo.includes('Camioneta') ? 'Camioneta ' : '') +
//                 (SubModelo.includes('Suv') ? 'Suv ' : '') +
//                 (SubModelo.includes('Van') ? 'Van ' : '') +
//                 (SubModelo.includes('4x2') ? '4x2 ' : '') +
//                 (SubModelo.includes('4x4') ? '4x4 ' : '') +
//                 (SubModelo.includes('8') ? '8 Valvulas ' : '') +
//                 (SubModelo.includes('12') ? '12 Valvulas ' : '') +
//                 (SubModelo.includes('16') ? '16 Valvulas ' : '') +
//                 (SubModelo.includes('Bencina') ? 'Bencina' : '') +
//                 (SubModelo.includes('Diesel') ? 'Diesel' : '')).toUpperCase().trim();
//             }else{
//                 e.Modelo = (e.modelo + ' ' +
//                 (SubModelo.includes('Hatchback') ? 'Hatchback ' : '') +
//                 (SubModelo.includes('Camioneta') ? 'Camioneta ' : '') +
//                 (SubModelo.includes('Suv') ? 'Suv ' : '') +
//                 (SubModelo.includes('Van') ? 'Van ' : '') +
//                 (SubModelo.includes('4x2') ? '4x2 ' : '') +
//                 (SubModelo.includes('4x4') ? '4x4 ' : '') +
//                 (SubModelo.includes('8') ? '8 Valvulas ' : '') +
//                 (SubModelo.includes('12') ? '12 Valvulas ' : '') +
//                 (SubModelo.includes('16') ? '16 Valvulas ' : '') +
//                 (SubModelo.includes('Bencina') ? 'Bencina' : '') +
//                 (SubModelo.includes('Diesel') ? 'Diesel' : '')).toUpperCase().trim();
//             }
        

//         if(i == 0 || e.Marca != aplicaciones.aplicaciones[i -1].Marca || e.Modelo != aplicaciones.aplicaciones[i -1].Modelo){

//             CathModelo = e.Modelo;
//             CathMarca = e.Marca;
//             CathAño = parseInt(e.ano);

//             Comprobar = false;
//             Modelos = Modelos.filter(a => {
//                 if(a.Modelo == CathModelo && a.Marca == CathMarca){
//                     a.Años.push(CathAño)
//                     Comprobar = true
//                 }    
//                 return a;            
//             })

//             if(!Comprobar){
//                 Modelos.push({Marca: e.Marca, Modelo: e.Modelo, SubModelo: e.submodelo, Años: [CathAño], Motor: Base})
//             }
//         }else if(e.Marca == aplicaciones.aplicaciones[i -1].Marca && e.Modelo == aplicaciones.aplicaciones[i -1].Modelo){
            
//         CathModelo = e.Modelo;
//         CathMarca = e.Marca;
//         CathAño = parseInt(e.ano);
//         Modelos = Modelos.filter(a => {
//                 if(a.Modelo == CathModelo && a.Marca == CathMarca){
//                     a.Años.push(CathAño)
//                 }    
//                 return a;            
//             })

//             }
//         return e;

//         })
        

//         Modelos.filter(e => {
//             e.Años.sort()
//             e.AñoI = e.Años.shift();
//             e.AñoT =  e.Años.pop();
//             delete e.Años;
//             return e;
//         })

//             let Datos = {};

//             await Mannheim.updateOne({ _id: MannheimCode._id },{$set: { Modelos: Modelos }});

//             for(let i = 0; i < Modelos.length; i++){
//                 let Años = '';

//                 Datos = {};
//                 for(let a = Modelos[i].AñoI; a < (Modelos[i].AñoT + 1); a++){
//                     Años = Años + ' ' + a
//                 }

//                 Datos.Marca = Modelos[i].Marca;
//                 Datos.Modelo = Modelos[i].Modelo;
//                 Datos.SubModelo = Modelos[i].SubModelo;
//                 Datos.AñoI = Modelos[i].AñoI;
//                 Datos.AñoT = Modelos[i].AñoT;
//                 Datos.Años = Modelos[i].AñoI + ' al ' + Modelos[i].AñoT,
//                 Datos.Busqueda = MannheimCode.Descripcion + ' ' + MannheimCode.Fabricante + ' ' + MannheimCode.Origen + ' '  + MannheimCode.Oem + ' ' + Modelos[i].Marca + ' ' +  Modelos[i].Modelo  + ' ' + Modelos[i].SubModelo +  + ' ' + Años + ' ' + Modelos[i].Motor
                
//                 Datos.Aplicacion = MannheimCode.Aplicacion;
//                 Datos.Descripcion = MannheimCode.Descripcion;
//                 Datos.Fabricante = MannheimCode.Fabricante;
//                 Datos.Img = MannheimCode.Img;
//                 Datos.Marca = MannheimCode.Marca;
//                 Datos.Oem = MannheimCode.Oem;
//                 Datos.Origen = MannheimCode.Origen;
//                 Datos.Precio = MannheimCode.Precio;
//                 Datos.Url = MannheimCode.Url;

//                 new Mannheim(Datos).save();
//                 console.log(Datos.Oem);
//             }


//             // return res.status(200).send('Ready')
//         });





//     } catch (error) {
//         console.log(error)
//     }
// })


function MargenPrecio(e) {
    if (e > 0 && e <= 5000) {
        total = Math.round(
          e * (200 / 100) + e
        );
      } else if (e > 5000 && e <= 10000) {
        total = Math.round(
          e * (150 / 100) + e
        );
      } else if (
        e > 10000 &&
        e <= 20000
      ) {
        total = Math.round(
          e * (140 / 100) + e
        );
      } else if (
        e > 20000 &&
        e <= 35000
      ) {
        total = Math.round(
          e * (120 / 100) + e
        );
      } else if (
        e > 35000 &&
        e <= 60000
      ) {
        total = Math.round(
          e * (100 / 100) + e
        );
      } else if (
        e > 60000 &&
        e <= 100000
      ) {
        total = Math.round(
          e * (85 / 100) + e
        );
      } else if (
        e > 60000 &&
        e <= 100000
      ) {
        total = Math.round(
          e * (70 / 100) + e
        );
      } else if (
        e > 100000 &&
        e <= 200000
      ) {
        total = Math.round(
          e * (60 / 100) + e
        );
      } else if (e > 200000) {
        total = Math.round(
          e * (50 / 100) + e
        );
      }
      return parseInt(total.toString().slice(0, -2) + '00')
    
}

function DefinirImagenes(Importadora, CodigoImportadora, OEM, Default ) {
  
      if (Importadora == "Refax") {
          return "https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + CodigoImportadora + "/" + CodigoImportadora + "A.jpg";
        }
        if (Importadora == "Mannheim") {
          return "http://200.73.35.244:8080/webclient/images/" + OEM + ".jpg";
        }
        if (Importadora == "Alsacia") {
            return Default
        }
        if (Importadora == "Bicimoto") {
          return Default
        }
  
}

async function PrecioMercado(Importadora, Codigo, res){
    console.log(Importadora, Codigo)
    if(Importadora == 'Refax'){
        try {
            var headers = {
                'authority': 'mundorepuestos.com',
                'accept': '*/*',
                'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
                'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'cookie': '__RequestVerificationToken=K2zbMoqF4jRdhKwdaneQKSdbHqIHxQZ8fwK1ZWo5WKY-Ce_radUTjROJd_RHC7WeqAebUj5Du0SuXqfoHls2keXi2dvLzba-qzAWhZXR91w1; _ga=GA1.2.1950744010.1648473233; _gid=GA1.2.1355550553.1649946365; ssupp.vid=viKZv8iPnM7I9; ssupp.visits=1',
                'origin': 'https://mundorepuestos.com',
                'referer': 'https://mundorepuestos.com/Buscador/buscadorC',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'empty',
                'sec-fetch-mode': 'cors',
                'sec-fetch-site': 'same-origin',
                'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
                'x-requested-with': 'XMLHttpRequest'
            };
            
            var dataString = '__RequestVerificationToken=KtqIQpwfpnD9dO6nOL207ZDENQooQo94te62BnCj8xAFr1RvQA4qA7juX157AO6Hugk3mVlg2Jw0wkEvwZGwQ-GpxjQ8rkrVq3Z01EwtvA01&_txtCodigo=' + Codigo + '&_EsModal=true&nocache=0.5536475222166539';
            
            var options = {
                url: 'https://mundorepuestos.com/Buscador/BuscarProducto',
                method: 'POST',
                headers: headers,
                body: dataString
            };
            
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(body);
                    var PrecioI = $('body > div:nth-child(5) > div > div.col-md-8.col-xs-12 > div.row.hidden-md.hidden-lg.resultMobile > div.col-xs-7.col-sm-7 > p:nth-child(4) > label:nth-child(1)').text() 
                    if(PrecioI != ''){
                        var Json = { Precio: $('body > div:nth-child(5) > div > div.col-md-8.col-xs-12 > div.row.hidden-md.hidden-lg.resultMobile > div.col-xs-7.col-sm-7 > p:nth-child(4) > label:nth-child(1)').text(), Stock: 'Disponible' }
                    }else{
                        var Json = { Precio: '0', Stock: 'Agotado'}
                    }

                    res.status(200).send(Json)
                }
            }
            request(options, callback);
    
    
        } catch (err) {
            return 'Error'
        }
    }else if(Importadora == 'Alsacia'){
        try {
            console.log('1')
            var headers = {
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
                'Connection': 'keep-alive',
                'Cookie': 'cookie_test=please_accept_for_session; osCsid=trful836e6t155p8et9bouban1; _ga=GA1.2.1309353061.1644500044; _gid=GA1.2.268232372.1649948602',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Upgrade-Insecure-Requests': '1',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t'
            };
            
            var options = {
                url: 'https://www.takora.cl/autos/repuestos/advanced_search_result.php?keywords=' + Codigo,
                headers: headers
            };
            
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(body);
                    var Json = {}
                    $('s').remove()
                    Json.Precio = $('.Price_listing').text() || '0';
                    Json.Origen = $('a.Manufacturer_listing').append('-').text().trim();
                    var url = $('body > table:nth-child(5) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').attr('href') || $('body > table:nth-child(5) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table:nth-child(5) > tbody > tr > td > a:nth-child(1)').attr('href');
                    if(!url){
                        res.status(200).send({ Stock: 'Eliminado', Precio: '0'})
                    }
                    console.log(url)
                    var headers = {
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
                        'Connection': 'keep-alive',
                        'Cookie': 'cookie_test=please_accept_for_session; osCsid=trful836e6t155p8et9bouban1; _ga=GA1.2.1309353061.1644500044; _gid=GA1.2.268232372.1649948602',
                        'Referer': 'https://www.takora.cl/autos/repuestos/advanced_search_result.php?keywords=' + Codigo,
                        'Sec-Fetch-Dest': 'document',
                        'Sec-Fetch-Mode': 'navigate',
                        'Sec-Fetch-Site': 'same-origin',
                        'Sec-Fetch-User': '?1',
                        'Upgrade-Insecure-Requests': '1',
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
                        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                        'sec-ch-ua-mobile': '?0',
                        'sec-ch-ua-platform': '"Windows"',
                        'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t'
                    };
                    
                    var options = {
                        url: url,
                        headers: headers
                    };
                    
                    function callback(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            const $ = cheerio.load(body);
                            if($('#button_in_cart_hover').attr('alt') == 'Agregar al Carro'){
                                Json.Stock = 'Disponible';
                            }else{
                                Json.Stock = 'Agotado';
                            }
                            res.status(200).send(Json)
                        }
                    }
                    
                    request(options, callback);
    
                }
            }
            
            request(options, callback);
        } catch (err) {
            return 'Error';
        }
    }else if(Importadora == 'Mannheim'){

        var headers = {
            'authority': 'repuestos.buscalibre.cl',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
            'cache-control': 'max-age=0',
            'cookie': '_gcl_au=1.1.917615709.1649083232; _ga_CLZQ407LJG=GS1.1.1649085157.2.0.1649085220.0; bl_session=cag8j2f4ru2hl6u6gbjjdcv2fg; _ga=GA1.3.850693886.1649083233; _gid=GA1.3.1085283071.1649951418; _ga=GA1.2.850693886.1649083233; _gid=GA1.2.1085283071.1649951418; wcsid=1S31TJKS8WgR0nXe1X61q0T6oD6jrb0k; hblid=0jaLLNNB3KonDgMo1X61q0TrY6mA0ajA; _okdetect=%7B%22token%22%3A%2216499514213730%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D; olfsk=olfsk33225248089623105; _okbk=cd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1649951423011%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd5%3Daway%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; _ok=3092-520-10-6951; _oklv=1649952998326%2C1S31TJKS8WgR0nXe1X61q0T6oD6jrb0k',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'sec-fetch-dest': 'document',
            'sec-fetch-mode': 'navigate',
            'sec-fetch-site': 'none',
            'sec-fetch-user': '?1',
            'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t',
            'upgrade-insecure-requests': '1',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
        };
        
        var options = {
            url: 'https://repuestos.buscalibre.cl/repuestos/search?q=' + Codigo,
            headers: headers
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                var PrecioI = $('#repuestos > div.lista > div > div.col-xs-12.col-md-3 > div > h2').text()
                console.log(PrecioI)
                $('strong').remove()
                var Origen = $('#repuestos > div.lista > div > div.col-xs-8.col-md-6 > div > div:nth-child(4)').append('-').text().trim()
                if(PrecioI != ''){
                    var Json = { Precio: PrecioI, Stock: 'Disponible' }
                }else{
                    var Json = { Precio: '0', Stock: 'Agotado'}
                }
                
                Json.Origen = Origen;

                res.status(200).send(Json)

                // res.status(200).send($('#repuestos > div.lista > div > div.col-xs-12.col-md-3 > div > h2').text());
            }
        }
        
        request(options, callback);

    }else if(Importadora == 'Bicimoto'){
        try {
            request.post({
                url: 'https://www.bicimoto.cl/ajax/process-login.php',
                headers: { 
                    'authority': 'www.bicimoto.cl',
                    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                    'accept': 'application/json, text/javascript, */*; q=0.01',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest',
                    'sec-ch-ua-mobile': '?0',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
                    'sec-ch-ua-platform': '"Windows"',
                    'origin': 'https://www.bicimoto.cl',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-dest': 'empty',
                    'referer': 'https://www.bicimoto.cl/login'
                 },
                method: 'post',
                jar: jar,
                body: 'rut=77.177.455-5&office=0&password=chipto001&remember=1&auth_token=ee806c1a54fdbe221912450f6d483015b5da32b6d57b4ea834cb08ed18eb28a2'
            }, function(err, response, body){
                if(err) {
                  return console.error(err);
                };
                //next
    var dataString = 'id_category=&id_subcategory=&id_subsubcategory=&option_filter=&search=' + Codigo + '&order=&register=999';
    
    var headers = {
        'authority': 'www.bicimoto.cl',
        'accept': 'application/json, text/javascript, */*; q=0.01',
        'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
        'cache-control': 'no-cache',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'origin': 'https://www.bicimoto.cl',
        'pragma': 'no-cache',
        'referer': 'https://www.bicimoto.cl/busqueda.php?search=' + Codigo,
        'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest'
    };
    
    var options = {
        url: 'https://www.bicimoto.cl/ajax/load-data-search.php',
        method: 'POST',
        jar: jar,
        headers: headers,
        body: dataString
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            var body = JSON.parse(body)
            const $ = cheerio.load(body.data);
            var Json = {}
            if($('body > div > div > div.producto-box-datos-boton > div:nth-child(2) > button').text().trim() == 'Comprar'){
                Json.Stock = 'Disponible';
            }else{
                Json.Stock = 'Agotado';
            };
            Json.Precio = $('body > div > div > div.producto-box-datos-boton > div.producto-box-boton.producto-box-prices > h3').text();
    
            res.status(200).send(Json)
        }
    }
    
    request(options, callback);
            })
    
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }


    }
}

async function GenerarCotizacion(res, Documento){
    var Detalles = [];

    for (let i = 0; i < Documento.Carrito.length; i++) {
        const init = {
        NroLinDet: parseInt(i) + 1,
        CdgItem: {
          TpoCodigo: 'Interna',
          VlrCodigo: Documento.Carrito[i].CodigoProducto
        },
        NmbItem: Documento.Carrito[i].Descripcion,
        QtyItem: parseInt(Documento.Carrito[i].Cantidad),
        PrcItem: parseInt(Documento.Carrito[i].Precio),
        MontoItem: parseInt(Documento.Carrito[i].Total.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', ''))
      }

      Detalles.push(init)
    }

    // Comienza la Cotizacion

    var options = {
              method: 'POST',
              url: 'https://libredte.cl/api/dte/documentos/emitir?normalizar=1&formato=json&links=0&email=0',
              headers: {
                authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
                accept: 'application/json',
                'Content-Type': 'application/json'
              },
              body: {
                Encabezado: {
                  IdDoc: {
                    TipoDTE: 39,
                    TermPagoGlosa: 'Cotizacion valida por 7 dias.'
                  },
                  Emisor: {
                    RUTEmisor: '77177455-5',
                    CdgVendedor: Documento.Usuario.toUpperCase()
                  },
                  Receptor: {
                    RUTRecep: Documento.Rut.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '').toUpperCase(),
                    RznSocRecep: Documento.Nombres.toUpperCase(),
                    GiroRecep: 'NO INFORMADO',
                    DirRecep: 'SIN DIRECCION',
                    CmnaRecep: 'SIN COMUNA'
                  }
                },
                Detalle: Detalles
              },
              json: true

    }

    request(options, async (error, response, body) => {

                var Json = {
                    Receptor: body.receptor,
                    Dte: body.dte,
                    Codigo: body.codigo,
                    Vendedor: Documento.Usuario,
                    Rut: Documento.Rut,
                    Cliente: Documento.Nombres,
                    Monto: Documento.Monto,
                    Cantidad: Detalles.length,
                    Detalles
                }

                console.log(Json, 'json')

              new Cotizaciones(Json).save();
              const options = {
                method: 'GET',
                url: 'https://libredte.cl/api/dte/dte_tmps/pdf/' + body.receptor + '/' + body.dte + '/' + body.codigo + '/77177455?cotizacion=1&papelContinuo=0&compress=0',
                headers: {
                  authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
                  accept: 'application/json',
                  'Content-type': 'application/pdf'
                },
                encoding: null
            
              }
            
              request(options, async (error, response, body) => {
                if (error) throw new Error(error)
            
                res.attachment(String('Cotizacion.pdf'))
                console.log('se enviara')
                res.status(200).send(body)
    })


            })



}

async function GenerarBoleta(res, Documento){
    var Detalles = [];

    for (let i = 0; i < Documento.Carrito.length; i++) {

        let Comp = await Productos.findOne({CodigoImportadora: Documento.Carrito[i].CodigoImportadora, Bodega: {$gte: parseInt(Documento.Carrito[i].Cantidad) }})

        if(!Comp){
            return res.status(200).send('EL PRODUCTO ' + Documento.Carrito[i].CodigoImportadora + ' - ' + Documento.Carrito[i].Descripcion + ' NO TIENE SUFICIENTE STOCK')
        }

        const init = {
        NroLinDet: parseInt(i) + 1,
        CdgItem: {
          TpoCodigo: 'Interna',
          VlrCodigo: Documento.Carrito[i].CodigoProducto
        },
        NmbItem: Documento.Carrito[i].Descripcion,
        QtyItem: parseInt(Documento.Carrito[i].Cantidad),
        PrcItem: parseInt(Documento.Carrito[i].Precio),
        MontoItem: parseInt(Documento.Carrito[i].Total.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', ''))
      }

      Detalles.push(init)
    }

    // Comienza la Boleta

    const options = {
        method: 'POST',
        url: 'https://libredte.cl/api/dte/documentos/emitir?normalizar=1&formato=json&links=0&email=0',
        headers: {
          authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
          accept: 'applicWation/json',
          'Content-Type': 'application/json'
        },
        body: {
          Encabezado: {
            IdDoc: {
              TipoDTE: 39,
              TermPagoGlosa: Documento.Observaciones
            },
            Emisor: {
              RUTEmisor: '77177455-5',
              CdgVendedor: Documento.Usuario.toUpperCase()
            },
            Receptor: {
              RUTRecep: Documento.Rut.replace('.', '').replace('.', '').replace('.', '').replace('.', '').toUpperCase(),
              RznSocRecep: String(Documento.Nombres + ' ' + Documento.Apellidos).toUpperCase(),
              GiroRecep: 'NO INFORMADO',
              DirRecep: 'SIN DIRECCION',
              CmnaRecep: 'SIN COMUNA'
            }
          },
          Detalle: Detalles
        },
        json: true

      }

    request(options, async (error, response, body) => {
 
               let Json = {
                    ...Documento,
                    Receptor: body.receptor,
                    Dte: body.dte,
                    Codigo: body.codigo,
                    Detalles,
                    Temporal: true
                }

                let Document = await new Boletas(Json).save();
                
                for (let i = 0; i < Documento.Carrito.length; i++) {
                        DisminuirStock(
                            Documento.Usuario, 
                            Documento.Carrito[i].Descripcion,
                            'Venta',
                            Documento.Carrito[i].CodigoImportadora,
                            Documento.Carrito[i].Cantidad,
                            Document._id,
                            0,
                            0,
                            Documento.Folio,
                            'Boleta')

                }

            //Comenzar a emitir el DTE Real
            let options2 = {
                method: 'POST',
                url: 'https://libredte.cl/api/dte/documentos/generar?getXML=0&links=0&email=0&retry=10&gzip=0',
                headers: {
                  authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
                  accept: 'application/json',
                  'Content-type': 'application/pdf'
                },
                body: {
                  emisor: 77177455,
                  receptor: body.receptor,
                  dte: body.dte,
                  codigo: body.codigo
                },
                json: true
              }
            
              request(options2, async (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    console.log(body, 'este es el body')
                    //Cambiar la compro a real
                    console.log(Document._id, 'el Id')
                    await Boletas.updateOne({_id: Document._id }, {$set: { Temporal: false, Folio: body.folio }})
                    //Actualizar o crear cliente
                    let Comprobar = await Clientes.findOne({ Cliente: Documento.Rut})
                    if(!Comprobar){
                        new Clientes(Documento).save();
                    }else{
                        await Clientes.updateOne({Cliente: Documento.Rut}, {$set: {
                            Telefono: Documento.Telefono,
                            Correo: Documento.Correo,
                            Comuna: Documento.Comuna,
                            Calle: Documento.Calle,
                            Numero: Documento.Numero,
                            RegionSeleccionada: Documento.RegionSeleccionada,
                            Departamento: Documento.Departamento,
                            Agencia: Documento.Agencia,
                            CountCompras: Documento.CountCompras,
                            MetodoPagoSeleccionado: Documento.MetodoPagoSeleccionado,
                            AgenciaSeleccionada: Documento.AgenciaSeleccionada,
                            CajaSeleccionada: Documento.CajaSeleccionada,
                            CuentaBancariaSeleccionada: Documento.CuentaBancariaSeleccionada,
                            EntregaSeleccionada: Documento.EntregaSeleccionada,
                            ComunaSeleccionada: Documento.ComunaSeleccionada,
                            CorreoCliente: Documento.CorreoCliente,
                            Titular: Documento.Titular
                        }})
                    }
                    return res.status(200).send(Document);
                }else{
                    await Boletas.deleteMany({Temporal: true})
                    return res.status(200).send(error)
                }
              })




            })



}

async function GenerarFactura(res, Documento){
    console.log(Documento);

    var Detalles = [];

    for (let i = 0; i < Documento.Carrito.length; i++) {

        let Comp = await Productos.findOne({CodigoImportadora: Documento.Carrito[i].CodigoImportadora, Bodega: {$gte: parseInt(Documento.Carrito[i].Cantidad) }})

        if(!Comp){
            return res.status(200).send('EL PRODUCTO ' + Documento.Carrito[i].CodigoImportadora + ' - ' + Documento.Carrito[i].Descripcion + ' NO TIENE SUFICIENTE STOCK')
        }

        const init = {
        NroLinDet: parseInt(i) + 1,
        CdgItem: {
          TpoCodigo: 'Interna',
          VlrCodigo: Documento.Carrito[i].CodigoProducto
        },
        NmbItem: Documento.Carrito[i].Descripcion,
        QtyItem: parseInt(Documento.Carrito[i].Cantidad),
        PrcItem: Math.round(parseInt(Documento.Carrito[i].Precio) / 1.19),
        MontoItem: Math.round((parseInt(Documento.Carrito[i].Total.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', '')) / 1.19) * parseInt(Documento.Carrito[i].Cantidad))
      }

      Detalles.push(init)
    }

    // Comienza la Boleta

    const options = {
        method: 'POST',
        url: 'https://libredte.cl/api/dte/documentos/emitir?normalizar=1&formato=json&links=0&email=0',
        headers: {
          authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
          accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: {
          Encabezado: {
            IdDoc: {
              TipoDTE: 33,
              TermPagoGlosa: Documento.Observaciones ||'SIN OBSERVACIONES'
            },
            Emisor: {
              RUTEmisor: '77177455-5',
              CdgVendedor: Documento.Usuario.toUpperCase() || 'DESCONOCIDO'
            },
            Receptor: {
              RUTRecep: Documento.RutEmpresa.replace('.', '').replace('.', '').replace('.', '').replace('.', '').toUpperCase() || '77177455-5',
              RznSocRecep: Documento.RazonSocialEmpresa.toUpperCase() || 'CHILEREPUESTOS SPA',
              GiroRecep: Documento.GiroEmpresa || 'VENTA DE PARTES, PIEZAS Y ACCESORIOS AUTOMOTRICES',
              DirRecep: Documento.DireccionEmpresa || 'AV. EJERCITO LIBERTADOR 62',
              CmnaRecep: Documento.ComunaEmpresa || 'SANTIAGO'
            }
          },
          Detalle: Detalles
        },
        json: true

      }

    request(options, async (error, response, body) => {

                let Json = {
                    ...Documento,
                    Receptor: body.receptor,
                    Dte: body.dte,
                    Codigo: body.codigo,
                    Detalles,
                    Temporal: true
                }
                
                Documento.Folio = 123;

                let Document = await new Facturas(Json).save();
                
                for (let i = 0; i < Documento.Carrito.length; i++) {


                    DisminuirStock(
                        Documento.Usuario, 
                        Documento.Carrito[i].Descripcion,
                        'Venta',
                        Documento.Carrito[i].CodigoImportadora,
                        Documento.Carrito[i].Cantidad,
                        Document._id,
                        0,
                        0,
                        Documento.Folio,
                        'Factura')

                }

            //Comenzar a emitir el DTE Real
            let options2 = {
                method: 'POST',
                url: 'https://libredte.cl/api/dte/documentos/generar?getXML=0&links=0&email=0&retry=10&gzip=0',
                headers: {
                  authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
                  accept: 'application/json',
                  'Content-type': 'application/pdf'
                },
                body: {
                  emisor: 77177455,
                  receptor: body.receptor,
                  dte: body.dte,
                  codigo: body.codigo
                },
                json: true
              }
            
              request(options2, async (error, response, body) => {
                if (!error && response.statusCode == 200) {
                    console.log(body, 'este es el body')
                    //Cambiar la compro a real
                    console.log(Document._id, 'el Id')
                    await Facturas.updateOne({_id: Document._id }, {$set: { Temporal: false, Folio: body.folio }})
                    return res.status(200).send(Document);
                }else{
                    await Boletas.deleteMany({Temporal: true})
                    return res.status(200).send(error)
                }
              })



            })

}



async function VentaDisminuirStockRestante(Cantidad, Codigo, Producto, Usuario, Id, Dte){
    try {
        let Registro = await Registros.findOne({CodigoImportadora: Codigo, CantidadRestante: {$gte: 1}}).sort({_id: -1}) // Busca el registro mas reciente ingresado y que tenga cantidad restante mayor o igual a 0
        console.log(Registro.CantidadRestante, Cantidad, 'Restante vs Cantidad')
        if(Registro.CantidadRestante < Cantidad){ // si la cantidad restante es menor que la cantidad necesaria
            let Json = {
                Registros: [...Producto.Registros, Registro]

            }
            await Productos.updateMany({ CodigoImportadora: Codigo }, {$set: Json })
            await Registros.updateOne({_id: Registro._id}, {$set: { CantidadRestante: 0 } })
            if(Dte == 'Boleta'){
                console.log('new boleta falta')
                await new Registros({
                   Boleta: Id,
                   Usuario: Usuario,
                   CodigoImportadora: Producto.CodigoImportadora,
                   Descripcion: Producto.Descripcion,
                   Cantidad: Registro.CantidadRestante, //Cantidad que se ocupo
                   CantidadTotal: 0, // Como se ocupo todo quedo en 0 esa factura
                   Salida: true,
                   Registro: Registro._id
                }).save();

            }else if(Dte == 'Factura'){
                await new Registros({
                   Factura: Id,
                   Usuario: Usuario,
                   CodigoImportadora: Producto.CodigoImportadora,
                   Descripcion: Producto.Descripcion,
                   Cantidad: Registro.CantidadRestante,
                   CantidadTotal: 0,
                   Salida: true,
                   Registro: Registro._id
                }).save();
            }
            console.log((Cantidad - Registro.CantidadRestante), Codigo, Producto, Usuario, Id, Dte, 'estos son los datos')
            return VentaDisminuirStockRestante((Cantidad - Registro.CantidadRestante), Codigo, Producto, Usuario, Id, Dte)
        }else{
            console.log('llego al final')
            let Json = {
                Registros: [...Producto.Registros, Registro]
            }
            await Productos.updateMany({ CodigoImportadora: Codigo }, {$set: Json })
            console.log(4, Registro._id, Registro.CantidadRestante, Cantidad, (Registro.CantidadRestante - Cantidad))
            await Registros.updateOne({_id: Registro._id}, {$set: { CantidadRestante: (Registro.CantidadRestante - Cantidad) } })
            if(Dte == 'Boleta'){
                await new Registros({
                   Boleta: Id,
                   Usuario: Usuario,
                   CodigoImportadora: Producto.CodigoImportadora,
                   Descripcion: Producto.Descripcion,
                   Cantidad: Cantidad,
                   CantidadTotal: (Registro.CantidadRestante - Cantidad), // Ejemplo la cantidad restante es 3 y la cantidad a restar es 2 quedara en 1 la cantidad total
                   Salida: true,
                   Registro: Registro._id
                }).save();
            
            }else if(Dte == 'Factura'){
                console.log('Se guardo el registro de la factura')
                await new Registros({
                   Factura: Id,
                   Usuario: Usuario,
                   CodigoImportadora: Producto.CodigoImportadora,
                   Descripcion: Producto.Descripcion,
                   Cantidad: Cantidad,
                   CantidadTotal: (Registro.CantidadRestante - Cantidad), // Ejemplo la cantidad restante es 3 y la cantidad a restar es 2 quedara en 1 la cantidad total
                   Salida: true,
                   Registro: Registro._id
                }).save();
            }
            return { Res: 'Restado', Cantidad: 0 };
        }   
    } catch (error) {
        console.log(error)
        return 'ERROR AL INTENTAR BUSCAR Y ACTUALIZAR EL REGISTRO DE STOCK'
    }
}

// Gestion de inventario
async function DisminuirStock(Usuario, Descripcion, Motivo, Codigo, Cantidad, Id = 0, Ubicacion, PrecioImportadora, Folio = 0, dte){
let Producto = await Productos.findOne({$or: [{ CodigoImportadora: Codigo}, {CodigoProducto: Codigo}]})
let Solicitud = null;
if(Motivo == 'Venta'){
 //Verificar si Existe Stock
 if(Producto.Bodega >= Cantidad ){ // Se verifica el stock
    console.log(dte)
     Solicitud = VentaDisminuirStockRestante(Cantidad, Codigo, Producto, Usuario, Id, dte)

     while(Solicitud.Res == 'Incompleto'){
         Solicitud = VentaDisminuirStockRestante(Solicitud.Cantidad, Codigo, Producto, Usuario, Id, dte)
     }

     //Falta guardar los registros

     if(Solicitud == 'ERROR AL INTENTAR BUSCAR Y ACTUALIZAR EL REGISTRO DE STOCK'){
         return 'ERROR AL INTENTAR BUSCAR Y ACTUALIZAR EL REGISTRO DE STOCK'
     }
     //Actualizar Stock del producto
     let Json = {
         Bodega: Producto.Bodega - Cantidad,
         Vendidos: Producto.Vendidos + Cantidad
     }
     console.log(Json, 'Verificar si el stock de bodega fue modificado')
     await Productos.updateMany({ CodigoImportadora: Codigo }, {$set: Json }) 
     return 'EXITO'
 }else{
     console.log('No hay suficiente Stock')
     return 'NO HAY SUFICIENTE STOCK'
 }

}else if(Motivo == 'Eliminar'){
    await Registros.deleteOne({_id: Id})
     //Actualizar Stock del producto
    let JsonProducto = {
        Bodega: Producto.Bodega - Cantidad
    }
    await Productos.updateMany({ CodigoImportadora: Codigo }, {$set: JsonProducto }) 
    return 'EXITO'
}else if(Motivo == 'Restar'){
    
    let Registro = await Registros.findOne({ _id: Id })
   
    let Json = {
        Cantidad: Registro.Cantidad - Cantidad,
        Descripcion: Descripcion,
        CantidadRestante: Registro.CantidadRestante - Cantidad,
        PrecioImportadora,
        Reajuste: [...Registro.Reajuste, new Date().toLocaleString('es-CL', {
            timeZone: 'America/Santiago'
        })],
        ReajusteUsuario: [...Registro.ReajusteUsuario, Usuario]
    }

    await Registros.updateOne({ _id: Id }, {$set: Json })

    //Actualizar Stock del producto
    let JsonProducto = {
        Bodega: Producto.Bodega - Cantidad,
        Ubicacion,
        Descripcion
    }
    

    await Productos.updateMany({ CodigoImportadora: Codigo }, {$set: JsonProducto }) 

    return 'EXITO'
}
}

async function AumentarStock(Usuario, Descripcion, Motivo, Codigo, Cantidad, Id = 0, Ubicacion, PrecioImportadora, Producto){
    if(typeof(Cantidad) === 'string'){
        Cantidad = parseInt(Cantidad)
    }
if(Motivo == 'Devolución'){ // Si es una devolucion esto es para aumentar -w-
    //Actualizar Stock del producto
    let JsonProducto = {
        Bodega: Producto.Bodega + Cantidad
    }
    await Productos.updateMany({ CodigoImportadora: Codigo }, {$set: JsonProducto })
    await Registros.updateOne({ _id: Id }, {$set: {CodigoImportadora: Producto.CodigoImportadora }})
    
}else if(Motivo == 'Sumar'){
    
    let Registro = await Registros.findOne({ _id: Id })

    let Json = {
        Cantidad: Registro.Cantidad + Cantidad,
        Descripcion: Descripcion,
        CantidadRestante: Registro.CantidadRestante + Cantidad,
        PrecioImportadora,
        Reajuste: [...Registro.Reajuste, new Date().toLocaleString('es-CL', {
            timeZone: 'America/Santiago'
        })],
        ReajusteUsuario: [...Registro.ReajusteUsuario, Usuario]
    }

    console.log(Json)
    await Registros.updateOne({ _id: Id }, {$set: Json })

    //Actualizar Stock del producto
    let JsonProducto = {
        Bodega: Producto.Bodega + Cantidad,
        Ubicacion,
        Descripcion
    }
    console.log(JsonProducto)

    await Productos.updateMany({ CodigoImportadora: Codigo }, {$set: JsonProducto }) 

    return 'EXITO'

}
}

async function GetDTERecibido(res, Emisor, Folio){
    try {
        var options = { method: 'GET',
          url: 'https://libredte.cl/api/dte/dte_recibidos/info/' + Emisor + '/33/'+ Folio + '/77177455',
          qs: { getXML: '0', getDetalle: '1', getDatosDte: '0' },
          headers: 
           { 'postman-token': '2c47dd13-bd8f-70bb-80f3-da2b030ea9cf',
             'cache-control': 'no-cache',
             authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==' } };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);
        
          return res.status(200).json(body);

        });
        
    } catch (error) {
        return res.status(200).send(error)
    }
}

async function BuscadorAlsacia(Busqueda, Cookie){
    
var headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.5',
    'Accept-Encoding': 'gzip, deflate, br',
    'Content-Type': 'application/x-www-form-urlencoded',
    'Origin': 'https://www.repuestosalsacia.com',
    'Connection': 'keep-alive',
    'Referer': 'https://www.repuestosalsacia.com/alsacia/home',
    'Cookie': 'csrf_cookie_name=f84a0c09e3eb87ec1a369fd7f8850dbd; ci_session='+ Cookie +'; ssupp.vid=vigpZqvCeuxVY; ssupp.visits=1; _ga=GA1.2.63973752.1656705830; _gid=GA1.2.1828128899.1656705830; _gat_gtag_UA_57096536_1=1',
    'Upgrade-Insecure-Requests': '1',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-User': '?1'
};

var dataString = 'csrf_test_name=f84a0c09e3eb87ec1a369fd7f8850dbd&filter=' + Busqueda;

var options = {
    url: 'https://www.repuestosalsacia.com/alsacia/buscador/search',
    method: 'POST',
    headers: headers,
    gzip: true,
    body: dataString
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        const $ = cheerio.load(body);
        return $('table').html()
    }
}

request(options, callback);
}

async function BuscadorRefax(Busqueda, Cookie){

    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://b2b.refaxchile.cl',
        'Connection': 'keep-alive',
        'Referer': 'https://b2b.refaxchile.cl/B2BRefax/buscadorA.jsp',
        'Cookie': Cookie,
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
    };
    
    var dataString = 'html=1&busqueda='+Busqueda+'+&usuariop=sasval13&cliente=C77554630';
    
    var options = {
        url: 'https://b2b.refaxchile.cl/B2BRefax/buscadorA',
        method: 'POST',
        headers: headers,
        gzip: true,
        body: dataString
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {

            return body
        }
    }
    
    request(options, callback);
    
}



module.exports = class API {
    // CRUD REGISTRAR USUARIO
    static async CREATE_USER(req, res){
        const Datos = req.body;

        //Activar cuando se requiera una imagen
        // const Imagename = req.file.filename ? req.file.filename : '';
        
        // Datos.Avatar = Imagename;

        const salt = await bcrypt.genSalt(10);

        const passhash = await bcrypt.hash(req.body.Contraseña, salt)

        req.body.Contraseña = passhash;

        try {
         await Usuarios.create(Datos);
         return res.status(201).json({ message: 'Exito' })   
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    static async CREATE_USER(req, res){
        const Datos = req.body;

        //Activar cuando se requiera una imagen
        // const Imagename = req.file.filename ? req.file.filename : '';
        
        // Datos.Avatar = Imagename;

        const salt = await bcrypt.genSalt(10);

        const passhash = await bcrypt.hash(req.body.Contraseña, salt)

        req.body.Contraseña = passhash;

        try {
         await Usuarios.create(Datos);
         return res.status(201).json({ message: 'Exito' })   
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    static async USER_LOGIN_ADMIN(req, res){
        try {
            var { Usuario, Correo, Contraseña, ip } = req.body;

            var User = await Usuarios.find({ Usuario, Correo });

            if(User.length == 0){
                return res.send('Error: 401')
            }else{
                User = User[0];
                if(User.Bloqueado == true){
                    return res.status(200).send('Error: 402')
                }
                
                bcrypt.compare(Contraseña, User.Contraseña, async function(err, result){
                    if(result == true){
                        var Token = User.Contraseña
                        await Usuarios.updateOne({ Usuario, Correo }, {$set: { Token: Token } });
                        return res.status(200).send({User, Token})
                    }else{
                        return res.status(200).send('Error: 403')
                    }
                })
            }
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    static async USER_LOGIN(req, res){
        try {
            var { Correo } = req.body;

            var User = await Usuarios.find({ Correo: Correo });

            if(User.length == 0){
                return res.json({ message: 'Usuario no registrado' })
            }else{
                User = User[0];
                if(User.Bloqueado == true){
                    return res.status(200).json({menssage: 'Usuarios Bloqueado: ' + User.BloqRazon })
                }

                bcrypt.compare(req.body.Contraseña, User.Contraseña, async function(err, result){
                    if(result == true){
                        // var ip = req.body.ip;
                        // req.session.token = User.Contraseña + ip;
                        req.session.token = User.Contraseña;
                        await Usuarios.updateOne({_id: User._id }, {$set: { Token: req.session.token } })
                        return res.status(200).json({ message: 'Inicio Exitoso' })
                    }else{
                        return res.status(200).json({ message: 'Contraseña Incorrecta' })
                    }
                })
            }
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }
        //CERRAR SESION
        static async GET_LOGOUT(req, res){
            try {
                return res.status(200).json('ready')
            } catch (err) {
                return res.status(200).json({ message: err.message});
            }
        }

    static async GET_USERS(req, res){
        try {
            var Users = await Usuarios.find({});
            return res.status(200).json(Users)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }
    static async GET_USER_BY_ID(req, res){
        try {
            var { id } = req.params;
            var User = await Usuarios.findOne({ _id: id });
            return res.status(200).json(User)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }
    static async UPDATE_USER(req, res){
        var { id } = req.params;
        let new_image = '';
        if(req.file){
            new_image = req.file.filename;
            try {
                fs.unlinkSync(__dirname, '../uploads/avatars/' + req.body.old_avatar);
            } catch (err) {
            }
        }else{
            new_image = req.body.old_avatar;
        }
        const newDatos = req.body;
        newDatos.Avatar = new_image;
        try {
            await Usuarios.updateOne({_id: id}, newDatos);
            return res.status(201).json({ message: 'Exito' });
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }
    static async DELETE_USER(req, res){
        try {
            var { id } = req.params;
            var User = await Usuarios.deleteOne({ _id: id });
            
            if(User.Avatar != ''){
                try {
                    fs.unlinkSync(__dirname, '../uploads/avatars/' + User.Avatar);
                } catch (err) {
                }
            }
            return res.status(200).json({menssage: 'Usuario Eliminado' })
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }
    static async BLOCK_USER(req, res){
        try {
            var { id } = req.params;
            var User = await Usuarios.updateOne({ _id: id }, {$set: { Bloqueado: true } });
            return res.status(200).json({menssage: 'Usuarios Bloqueado' })
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    static async UNBLOCK_USER(req, res){
        try {
            var { id } = req.params;
            var User = await Usuarios.updateOne({ _id: id }, {$set: { Bloqueado: false } });
            return res.status(200).json({menssage: 'Usuarios Bloqueado' })
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }
    static async GET_USER_TOKEN(req, res){
        try {
            var Token = req.body.Token;
            var CurrentUser = await Usuarios.findOne({ Token: Token });

            if(CurrentUser.length == 0){
                return res.status(200).json('Invitado');
            }else{
                return res.status(200).json(CurrentUser)
            }
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    static async GET_USER_TOKEN_ADMIN(req, res){
        try {
            var Token = req.body.Token;
            var CurrentUser = await Usuarios.find({ Token: Token });
            if(CurrentUser.length == 0){
                return res.status(200).send('Invitado');
            }else{
                return res.status(200).json(CurrentUser)
            }
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    //CRUD PRODUCTOS
    static async GET_PRODUCTS_OFF(req, res){
        try {
            // Inicio
            const perPage = 10
            const page = parseInt(req.params.page) || 1

            var Datos = await Productos.find({ Stock: {$ne: "0" } }).skip((perPage * page) - perPage).limit(perPage).sort({ Descripcion: 1})

            return res.json(Datos)

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    static async POST_PRODUCTS_CODE(req, res){
        try {
            var { Code } = req.body;

            var response = await Productos.find(
                { $or: [
                  {CodigoImportadora: Code },
                  {OEM: Code },
                  {CodigoProducto: Code }
                ] })

                var ResModelos = [];

                if(response.length == 1){
                    return res.json(response)
                }

                for(var i = 0; i < response.length; i++){
                    if(i > 0){
                        if(response[i].Modelo == response[i - 1].Modelo){
                        }else{
                            ResModelos.push(response[i])
                            console.log(ResModelos)
                        }
                    }
                }

                if(ResModelos.length == 0){
                    ResModelos = [response[0]]
                }

                console.log(response, ResModelos, response.length)

            return res.json(ResModelos)

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    static async POST_API_CHILEREPUESTOS(req, res){
        try {
            let { Buscar } = req.body;

            var options = { method: 'GET',
              url: 'https://chilerepuestos.com/admin/secrect-page-toke-483482',
              qs: { param1: Buscar },
              headers: 
               { 'cache-control': 'no-cache' } };

            request(options, function (error, response, body) {
              if (error) throw new Error(error);
              return res.send(body)
            });



        } catch (error) {
            res.status(200).send(error);
        }
    }


    static async POST_API_REFAX(req, res){
     try {
        console.log(req.body)
        let { Buscar } = req.body;
        
        let CookieRefax = await Credenciales.findOne({ Importadora: 'Refax' });

        let headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': 'https://b2b.refaxchile.cl',
            'Connection': 'keep-alive',
            'Referer': 'https://b2b.refaxchile.cl/B2BRefax/buscadorA.jsp',
            'Cookie': CookieRefax.Cookie,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin'
        };
        
        let dataString = 'html=1&busqueda='+Buscar+'+&usuariop=sasval13&cliente=C77554630';
        
        let options = {
            url: 'https://b2b.refaxchile.cl/B2BRefax/buscadorA',
            method: 'POST',
            headers: headers,
            gzip: true,
            jar: jar,
            body: dataString
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                let RefaxResult = body;



                if(typeof(body) === 'string' && Buscar.split(' ').length == 1 && response.request.headers["content-length"] == 60){
                    console.log('se ejecuto');
                    let headers = {
                        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
                        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                        'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
                        'Accept-Encoding': 'gzip, deflate, br',
                        'Referer': 'https://b2b.refaxchile.cl/B2BRefax/index.jsp',
                        'Connection': 'keep-alive',
                        'Cookie': CookieRefax.Cookie,
                        'Upgrade-Insecure-Requests': '1',
                        'Sec-Fetch-Dest': 'document',
                        'Sec-Fetch-Mode': 'navigate',
                        'Sec-Fetch-Site': 'same-origin',
                        'Sec-Fetch-User': '?1'
                    };
                    
                    let options = {
                        url: 'https://b2b.refaxchile.cl/B2BRefax/producto.jsp?idArticulo='+Buscar+'&tipo=D',
                        headers: headers,
                        gzip: true
                    };
                    
                    function callback(error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body, 'here')
                            const $ = cheerio.load(body);

                            console.log($('#idArticulo').text().trim())


                            let Json = [[ {
                                Sku: $('#idArticulo').text().trim(),
                                Producto: $('#block-right > div.title-producto > h3').text().trim(),
                                Descripcion: ($('#block-right > div.description > p:nth-child(1)').text().trim() + ' ' + $('#block-right > div.description > p:nth-child(2)').text().trim() + ' ' + $('#block-right > div.description > p:nth-child(3)').text().trim()).trim(),
                                MARCA: $('#more-info > div > div:nth-child(2) > div.marca.row > span:nth-child(2)').text().trim(),
                                Origen: $('#more-info > div > div:nth-child(2) > div.origen.row > span:nth-child(2)').text().trim(),
                                PrecioImportadora: $('#precio').text().trim(),
                                Stock: $('#stocks').text().trim(),
                                Llegada: $('#more-info > div > div:nth-child(3) > div.llegada.row > span:nth-child(2)').text().trim(),
                                Oem: $('div.n-original > ul').html()
                            },
                            {},
                            {}
                        ]]

                            return res.status(200).send(Json);
                        }
                    }
                    
                    request(options, callback);

                }else{
                
                if(RefaxResult.length == 78){
                    return res.status(200).send('Error al iniciar sesion')
                }

                const jsonTablesRefax = HtmlTableToJson.parse('<table>'+RefaxResult.replace('MARCA', 'Marca').replace('MODELO', 'Modelo').replace('AÑO I', 'AñoI').replace('AÑO T', 'AñoT').replace('PRODUCTO', 'Producto').replace('DESCRIPCION', 'Descripcion').replace('ORIGEN', 'Origen').replace('N° REFAX', 'Sku').replace('$ NETO', 'PrecioImportadora').replace('STOCK', 'Stock')+'</table>');


                res.status(200).send(jsonTablesRefax.results);
                return;
                
            }

            }
        }

        request(options, callback);
        
     } catch (error) {
        res.status(200).send(error)
     } 
    }


    
    static async POST_API_ALSACIA(req, res){
        try {
   

            let { Buscar } = req.body;
            
            let CookieAlsacia = await Credenciales.findOne({ Importadora: 'Alsacia' });

            let headers2 = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'https://www.repuestosalsacia.com',
                'Connection': 'keep-alive',
                'Referer': 'https://www.repuestosalsacia.com/alsacia/home',
                'Cookie': 'csrf_cookie_name=f84a0c09e3eb87ec1a369fd7f8850dbd; ci_session='+ CookieAlsacia.Cookie +'; ssupp.vid=vigpZqvCeuxVY; ssupp.visits=1; _ga=GA1.2.63973752.1656705830; _gid=GA1.2.1828128899.1656705830; _gat_gtag_UA_57096536_1=1',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'same-origin',
                'Sec-Fetch-User': '?1'
            };
            
            let dataString2 = 'csrf_test_name=f84a0c09e3eb87ec1a369fd7f8850dbd&filter=' + Buscar;
            
            let options2 = {
                url: 'https://www.repuestosalsacia.com/alsacia/buscador/search',
                method: 'POST',
                headers: headers2,
                gzip: true,
                body: dataString2
            };
            
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
            
                    const $ = cheerio.load(body);

                    const jsonTablesAlsacia = HtmlTableToJson.parse('<table>'+$('table').html().replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace('Descripción', 'Descripcion').replace('Año Ini', 'AñoI').replace('Año Fin', 'AñoT')+'</table>');

                   res.status(200).send(jsonTablesAlsacia.results);
                   return;
   
               }
           }
   
           request(options2, callback);
           
        } catch (error) {
           res.status(200).send(error)
        } 
       }

       static async POST_PAGEALSACIA(req, res){

        let { Page } = req.body || 1;
        
        let CookieAlsacia = await Credenciales.findOne({ Importadora: 'Alsacia' });

       var headers = {
        'authority': 'www.repuestosalsacia.com',
        'accept': '*/*',
        'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
        'Cookie': 'csrf_cookie_name=f84a0c09e3eb87ec1a369fd7f8850dbd; ci_session='+ CookieAlsacia.Cookie +'; ssupp.vid=vigpZqvCeuxVY; ssupp.visits=1; _ga=GA1.2.63973752.1656705830; _gid=GA1.2.1828128899.1656705830; _gat_gtag_UA_57096536_1=1',
        'referer': 'https://www.repuestosalsacia.com/alsacia/buscador',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'x-requested-with': 'XMLHttpRequest'
    };
    
    var options = {
        url: 'https://www.repuestosalsacia.com/alsacia/buscador/ajax_result2/' + 1,
        headers: headers
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            let Json = [];

            if(body.data != ''){
                Json = body.data.filter(e => {
                    // if(e.Stock != '0'){
                        e.MARCA = e.FirmName;
                        e.Sku = e.ItemCode;
                        e.AñoI = e.U_inicio;
                        e.AñoT = e.U_fin;
                        e.Marca = e.U_marca;
                        e.Modelo = e.U_submodelo;
                        e.Producto = e.U_subsubcategoria;
                        e.Descripcion = e.descripcion;
                        e.Origen = e.origen;
                        e.Precio = e.precio;
                        e.Stock = e.stock;

                        return e;
                    // }
                })
            }

            return res.send(Json)
        }
    }
    
    request(options, callback);


}


   static async POST_CONSULTARALSACIA(req, res){

    let { Codigo } = req.body;
    
    let CookieAlsacia = await Credenciales.findOne({ Importadora: 'Alsacia' });

    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://www.repuestosalsacia.com/alsacia/buscador',
        'Cookie': 'csrf_cookie_name=f84a0c09e3eb87ec1a369fd7f8850dbd; ci_session='+ CookieAlsacia.Cookie +'; ssupp.vid=vigpZqvCeuxVY; ssupp.visits=1; _ga=GA1.2.63973752.1656705830; _gid=GA1.2.1828128899.1656705830; _gat_gtag_UA_57096536_1=1',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'iframe',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin'
    };
    
    var options = {
        url: 'https://www.repuestosalsacia.com/alsacia/producto/detalle/' + Codigo,
        headers: headers,
        gzip: true
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            res.status(200).send($('body').html())
        }
    }
    
    request(options, callback);


    }

       static async POST_EXTRAER_BICIMOTO(req, res){
        try {
            let { Buscar } = req.body;
   

            let CookieBicimoto = await Credenciales.findOne({ Importadora: 'Bicimoto' });


            process.env.COUNT = parseInt(process.env.COUNT) + 1;

            let dataStringTres = 'id_category=&id_subcategory=&id_subsubcategory=&option_filter=&search=%%&order=&register=100&page='+process.env.COUNT;
    
                                let headersTres = {
                                    'authority': 'www.bicimoto.cl',
                                    'accept': 'application/json, text/javascript, */*; q=0.01',
                                    'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
                                    'cache-control': 'no-cache',
                                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                    'origin': 'https://www.bicimoto.cl',
                                    'pragma': 'no-cache',
                                    'referer': 'https://www.bicimoto.cl/busqueda.php?search=' + Buscar,
                                    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                                    'sec-ch-ua-mobile': '?0',
                                    'sec-ch-ua-platform': '"Windows"',
                                    'sec-fetch-dest': 'empty',
                                    'sec-fetch-mode': 'cors',
                                    'sec-fetch-site': 'same-origin',
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
                                    'x-requested-with': 'XMLHttpRequest',
                                    'Cookie': CookieBicimoto.Cookie
                                };
    
                                var optionsTres = {
                                    url: 'https://www.bicimoto.cl/ajax/load-data-search.php',
                                    method: 'POST',
                                    headers: headersTres,
                                    body: dataStringTres,
                                };
    
                                function callbackTres(error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        let body = JSON.parse(response.body)
                                        const $ = cheerio.load(body.data);
                                        console.log('Bicimoto OK')
    
                                        $('strong').remove();
                                        $('i').remove();
    
                                        let cantidadB = $('body > div').length + 1;
    
                                        let ProductosB = []
                                        console.log(cantidadB);
    
                                        for(let i = 1; i < cantidadB; i++){
                                            console.log(i, process.env.COUNT)
                                        let Descripcion = $('body > div:nth-child('+ i +') > div > div.producto-box-pack > div.producto-box-datos > h2').text().trim();
                                        let Sku = $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(2)').text().trim();
                                        let Marca = $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(3)').text().trim();
                                        let Modelo = $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(4)').text().trim() + ' ' + $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(5)').text().trim();
                                        let Oem = $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(6)').text().trim();
                                        let Origen =  $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(7)').text().trim()
                                        let PrecioImportadora = $('body > div:nth-child('+i+') > div > div.producto-box-datos-boton > div.producto-box-boton.producto-box-prices > h3').text().replace('$', '').trim()
                                        let Stock = $('body > div:nth-child('+i+') > div > div.producto-box-datos-boton > div:nth-child(2) > button').text().trim() == 'Comprar' ? 'Disponible' : '0'
    
                                        let JsonB = {
                                            Sku,
                                            Descripcion,
                                            Marca,
                                            Modelo,
                                            Oem,
                                            Origen,
                                            PrecioImportadora,
                                            Stock,
                                            Busqueda: Sku + ' ' + Descripcion + ' ' + Marca + ' ' + Modelo + ' ' + Oem + ' ' + Origen
                                        }
                                         
                                        new Bicimoto(JsonB).save()

                                        // ProductosB.push(JsonB)
    
                                        }

                                        if(ProductosB.length == 0){
                                            ProductosB = [
                                                {
                                                    "Descripcion": process.env.COUNT,
                                                    "Marca": process.env.COUNT,
                                                    "Modelo": process.env.COUNT,
                                                    "Oem": process.env.COUNT,
                                                    "Origen": process.env.COUNT,
                                                    "PrecioImportadora": process.env.COUNT,
                                                    "Sku": process.env.COUNT,
                                                    "Stock": process.env.COUNT,
                                                    "Busqueda": process.env.COUNT,
                                                },
                                                {
                                                    "Descripcion": process.env.COUNT,
                                                    "Marca": process.env.COUNT,
                                                    "Modelo": process.env.COUNT,
                                                    "Oem": process.env.COUNT,
                                                    "Origen": process.env.COUNT,
                                                    "PrecioImportadora": process.env.COUNT,
                                                    "Sku": process.env.COUNT,
                                                    "Stock": process.env.COUNT,
                                                    "Busqueda": process.env.COUNT,
                                                }
                                            ]
                                        }

                   res.status(200).send(ProductosB);
                   return;
   
   
               }
                                
            }

            request(optionsTres, callbackTres);
                                
        } catch (error) {
            console.log(error)
           res.status(200).send(error)
        } 
       }


       
    static async POST_API_MANNHEIM(req, res){
        try {

            let { Buscar } = req.body;


            var Descripcion = Buscar.slice()
            
            var Descripcion = Descripcion.split(' ')

            let i = 0
            var reset = () => { i = 0; return i }
            var next = () => { i++; return i }

            if (Descripcion.length == 1) {
                var Datos = await Mannheim.find({ $and: [{ $or: [{ Busqueda: new RegExp(Descripcion[0], 'i') }  ] } ] }).limit(100);
            }else if(Descripcion.length == 2) {
                var Datos = await Mannheim.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 3) {
                var Datos = await Mannheim.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 4) {
                var Datos = await Mannheim.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 5) {
                var Datos = await Mannheim.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 6) {
                var Datos = await Mannheim.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 7) {
                var Datos = await Mannheim.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 8) {
                var Datos = await Mannheim.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }



            let Pass = Buscar.split(' ');
            console.log(Pass);
            if(Pass.includes('metal') || Pass.includes('biela') || Pass.includes('0.75') || Pass.includes('h-1') || Pass.includes('h1')){
                
            }else{
                Buscar = Buscar.replace('mastervan', 'master').replace('master van', 'master').replace(',', '').replace('.', '').replace('1', '').replace('2', '').replace('3', '').replace('4', '').replace('5', '').replace('6', '').replace('7', '').replace('8', '').replace('9', '').replace('0', '').trim();
            }

            let headersCuatro = {
                'authority': 'repuestos.buscalibre.cl',
                'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
                'cache-control': 'max-age=0',
                'cookie': '_gcl_au=1.1.917615709.1649083232; _ga_CLZQ407LJG=GS1.1.1649085157.2.0.1649085220.0; bl_session=cag8j2f4ru2hl6u6gbjjdcv2fg; _ga=GA1.3.850693886.1649083233; _gid=GA1.3.1085283071.1649951418; _ga=GA1.2.850693886.1649083233; _gid=GA1.2.1085283071.1649951418; wcsid=1S31TJKS8WgR0nXe1X61q0T6oD6jrb0k; hblid=0jaLLNNB3KonDgMo1X61q0TrY6mA0ajA; _okdetect=%7B%22token%22%3A%2216499514213730%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D; olfsk=olfsk33225248089623105; _okbk=cd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1649951423011%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd5%3Daway%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; _ok=3092-520-10-6951; _oklv=1649952998326%2C1S31TJKS8WgR0nXe1X61q0T6oD6jrb0k',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-dest': 'document',
                'sec-fetch-mode': 'navigate',
                'sec-fetch-site': 'none',
                'sec-fetch-user': '?1',
                'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t',
                'upgrade-insecure-requests': '1',
                'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
            };
            
            let optionsCuatro = {
                url: 'https://repuestos.buscalibre.cl/repuestos/search?q=' + Buscar,
                headers: headersCuatro
            };
            
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {
                    const $ = cheerio.load(body);
                    console.log('Mannheim OK')
                    $('strong').remove()
                    let Cantidad =  $('#repuestos > div > div').length + 1;
                    console.log(Cantidad)
                    let ProductoM = [];
                    for(let i = 0; i < Cantidad; i++){
                        let Descripcion = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > h3 > a').text().trim();
                        let Oem = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div:nth-child(2)').text().trim();
                        let Fabricante = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div:nth-child(3)').text().trim();
                        let Origen = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div:nth-child(4)').text().trim();
                        let PrecioImportadora = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-12.col-md-3 > div > h2').text().replace('$', '').trim();
                        let Aplicacion = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div.cursor-pointer.ver-aplicaciones.color-dark-gray.margin-bottom-10.margin-top-10').attr('data-part-id')
                    
                        ProductoM.push({
                            Descripcion,
                            Oem,
                            Fabricante,
                            Origen,
                            PrecioImportadora,
                            Aplicacion
                        })                                    
                    }

                    ProductoM.shift();
                    ProductoM.pop();
                    ProductoM.pop();
                    ProductoM.pop();


                    console.log(ProductoM)

                    let Json = [
                        ProductoM,
                        Datos
                    ]


                   res.status(200).send(Json);
   
   
               }
           }
   
           request(optionsCuatro, callback);
           
        } catch (error) {
            console.log(error)
           res.status(200).send(error)
        } 
       }




       static async POST_API_NORIEGA(req, res){
        try {
        

        let { Buscar } = req.body;


        let CookieNoriega = await Credenciales.findOne({ Importadora: 'Noriega' });


        let headersCinco = {
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            'Cookie': CookieNoriega.Cookie
        };
     
         let optionsCinco = {
             method: 'POST',
             url: 'http://ecommerce.noriegavanzulli.cl/b2b/resultado_googleo_texto.jsp',
             headers: headersCinco,
             form: { texto: Buscar },
         };
     
         function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            
            let Noriega = HtmlTableToJson.parse('<table><thead><th>Marca</th><th>Modelo</th><th>Año</th><th>Producto</th><th>Descripcion</th><th>Origen</th><th>Sku</th><th>Precio</th><th>Stock</th></thead>'+$('tbody').html()+'</table>');

   
            res.status(200).send(Noriega.results[0]);
   
   
               }
           }
   
           request(optionsCinco, callback);
           
        } catch (error) {
           res.status(200).send(error)
        } 
       }


       static async POST_API_CUATRORUEDAS(req, res){

        let { Buscar } = req.body;

        let headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
            'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Origin': 'https://www.cuatroruedas.cl',
            'Connection': 'keep-alive',
            'Referer': 'https://www.cuatroruedas.cl/sistema/',
            'Upgrade-Insecure-Requests': '1',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-User': '?1',
            jar: jar
        };
        
        let dataString = '_method=POST&data%5BCliente%5D%5Brut_empresa%5D=77.177.455-5&data%5BCliente%5D%5Bclave%5D=ejercito62';
        
        let options = {
            url: 'https://www.cuatroruedas.cl/sistema/clientes/login',
            method: 'POST',
            headers: headers,
            gzip: true,
            body: dataString,
            jar: jar
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
    
                let headersdos = {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
                "Accept-Language": "es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3",
                "Content-Type": "multipart/form-data; boundary=---------------------------285243982628837725834080908036",
                "Upgrade-Insecure-Requests": "1",
                "Sec-Fetch-Dest": "document",
                "Sec-Fetch-Mode": "navigate",
                "Sec-Fetch-Site": "same-origin",
                "Sec-Fetch-User": "?1",
                    jar: jar
                };
    
    
                let dataStringdos = `-----------------------------285243982628837725834080908036\r\nContent-Disposition: form-data; name=\"_method\"\r\n\r\nPOST\r\n-----------------------------285243982628837725834080908036\r\nContent-Disposition: form-data; name=\"data[Producto][modelo_uso]\"\r\n\r\n${Buscar}\r\n-----------------------------285243982628837725834080908036--\r\n`;            

                let optionsdos = {
                    url: 'https://www.cuatroruedas.cl/sistema/productos/buscar_catalogo',
                    method: 'POST',
                    headers: headersdos,
                    body: dataStringdos,
                    jar: jar
                };
                
                function callback(error, response, body) {
                    if (!error && response.statusCode == 200) {
    
                        const $ = cheerio.load(body);
                        
                        let prueba = $('div > div.content > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > table > tbody').html();

                        const jsonTablesCuatroRuedas = HtmlTableToJson.parse('<table><thead><th>1</th><th>2</th><th>3</th><th>Sku</th><th>3</th><th>Descripcion</th><th>4</th><th>Stock</th><th>5</th><th>6</th><th>7</th><th>Precio</th><th>8</th></thead><tbody>'+prueba+'</tbody></table>');
    
                        jsonTablesCuatroRuedas.results[0] = jsonTablesCuatroRuedas.results[0].filter(e => {
                            if(e.Sku != '' && e.Descripcion != '' && e.Precio != ''){
                                delete e[1]
                                delete e[2]
                                delete e[3]
                                delete e[4]
                                delete e[5]
                                delete e[6]
                                delete e[7]
                                delete e[8]
                                delete e[14]
                                return e;
                            }
                        })
    
    
                        jsonTablesCuatroRuedas.results[0] = jsonTablesCuatroRuedas.results[0].filter(e => {
                            if(Object.keys(e).length != 0){
                                return e;
                            }
                        })
    
    
                        return res.send(jsonTablesCuatroRuedas.results[0]);
                    }
                }
                
                request(optionsdos, callback);
    
    
    
    
            }
        }
        
        request(options, callback);
    
    
    }


    static async POST_API_GABTEC(req, res){
        try {
            // Inicio
            var Descripcion = req.body.Buscar.slice()
            
            Descripcion.split(' ');
            var Descripcion = Descripcion.split(' ')

            let i = 0
            var reset = () => { i = 0; return i }
            var next = () => { i++; return i }

            if (Descripcion.length == 1) {
                var Datos = await Gabtec.find({ $and: [{ $or: [{ Busqueda: new RegExp(Descripcion[0], 'i') }  ] } ] }).limit(100);
            }else if(Descripcion.length == 2) {
                var Datos = await Gabtec.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 3) {
                var Datos = await Gabtec.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 4) {
                var Datos = await Gabtec.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 5) {
                var Datos = await Gabtec.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }

            return res.status(200).send(Datos)

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    static async POST_API_BICIMOTO(req, res){
        try {
            // Inicio
            var Descripcion = req.body.Buscar.slice()
            
            Descripcion.split(' ');
            var Descripcion = Descripcion.split(' ')

            let i = 0
            var reset = () => { i = 0; return i }
            var next = () => { i++; return i }

            if (Descripcion.length == 1) {
                var Datos = await Bicimoto.find({ $and: [{ $or: [{ Busqueda: new RegExp(Descripcion[0], 'i') }  ] } ] }).limit(100);
            }else if(Descripcion.length == 2) {
                var Datos = await Bicimoto.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 3) {
                var Datos = await Bicimoto.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 4) {
                var Datos = await Bicimoto.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 5) {
                var Datos = await Bicimoto.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 6) {
                var Datos = await Bicimoto.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 7) {
                var Datos = await Bicimoto.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }

            return res.status(200).send(Datos)

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    static async POST_API_AUTOMARCOS(req, res){
        try {
            // Inicio
            var Descripcion = req.body.Buscar.slice()
            
            Descripcion.split(' ');
            var Descripcion = Descripcion.split(' ')

            let i = 0
            var reset = () => { i = 0; return i }
            var next = () => { i++; return i }

            if (Descripcion.length == 1) {
                var Datos = await Automarcos.find({ $and: [{ $or: [{ Busqueda: new RegExp(Descripcion[0], 'i') }  ] } ] }).limit(100);
            }else if(Descripcion.length == 2) {
                var Datos = await Automarcos.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 3) {
                var Datos = await Automarcos.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 4) {
                var Datos = await Automarcos.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 5) {
                var Datos = await Automarcos.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }

            return res.status(200).send(Datos)

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    
    static async POST_API_SASVAL(req, res){
        try {
            // Inicio
            var Descripcion = req.body.Buscar.slice()
            
            Descripcion.split(' ');
            var Descripcion = Descripcion.split(' ')

            let i = 0
            var reset = () => { i = 0; return i }
            var next = () => { i++; return i }

            if (Descripcion.length == 1) {
                var Datos = await Sasval.find({ $and: [{ $or: [{ Busqueda: new RegExp(Descripcion[0], 'i') }  ] } ] }).limit(100);
            }else if(Descripcion.length == 2) {
                var Datos = await Sasval.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 3) {
                var Datos = await Sasval.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 4) {
                var Datos = await Sasval.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }else if(Descripcion.length == 5) {
                var Datos = await Sasval.find({ $and: [ { $or: [ { $and: [{ Busqueda: new RegExp(Descripcion[reset()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[next()], 'i') }, { Busqueda: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }  ] }).limit(100);
            }

            return res.status(200).send(Datos);

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    static async POST_API_IMPORTADORA(req, res){


        let { Buscar } = req.body;
        console.log(Buscar)
        
        let Cookies = await Credenciales.find();
        
        var CookieAlsacia = {};
        var CookieRefax = {};
        var CookieBicimoto = {};
        let CookieNoriega = {};

        for (let i = 0; i < Cookies.length; i++) {
            if(Cookies[i].Importadora == 'Refax'){
                CookieRefax.Cookie = Cookies[i].Cookie;
            }else if(Cookies[i].Importadora == 'Alsacia'){
                CookieAlsacia.Cookie = Cookies[i].Cookie;
            }else if(Cookies[i].Importadora == 'Bicimoto'){
                CookieBicimoto.Cookie = Cookies[i].Cookie;
            }else if(Cookies[i].Importadora == 'Noriega'){
                CookieNoriega.Cookie = Cookies[i].Cookie;
            }
        }

        let environment = process.env.NODE_ENV || 'development';


        let SendJson; 

        if(environment == 'development'){
            try {
    
                var headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Origin': 'https://b2b.refaxchile.cl',
                    'Connection': 'keep-alive',
                    'Referer': 'https://b2b.refaxchile.cl/B2BRefax/buscadorA.jsp',
                    'Cookie': CookieRefax.Cookie,
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin'
                };
                
                var dataString = 'html=1&busqueda='+Buscar+'+&usuariop=sasval13&cliente=C77554630';
                
                var options = {
                    url: 'https://b2b.refaxchile.cl/B2BRefax/buscadorA',
                    method: 'POST',
                    headers: headers,
                    gzip: true,
                    body: dataString
                };
                
                function callback(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let RefaxResult = body;
                        console.log('Refax OK')
                        //Init Alsacia Request
                        var headers2 = {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                            'Accept-Language': 'en-US,en;q=0.5',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Origin': 'https://www.repuestosalsacia.com',
                            'Connection': 'keep-alive',
                            'Referer': 'https://www.repuestosalsacia.com/alsacia/home',
                            'Cookie': 'csrf_cookie_name=f84a0c09e3eb87ec1a369fd7f8850dbd; ci_session='+ CookieAlsacia.Cookie +'; ssupp.vid=vigpZqvCeuxVY; ssupp.visits=1; _ga=GA1.2.63973752.1656705830; _gid=GA1.2.1828128899.1656705830; _gat_gtag_UA_57096536_1=1',
                            'Upgrade-Insecure-Requests': '1',
                            'Sec-Fetch-Dest': 'document',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-User': '?1'
                        };
                        
                        var dataString2 = 'csrf_test_name=f84a0c09e3eb87ec1a369fd7f8850dbd&filter=' + Buscar;
                        
                        var options2 = {
                            url: 'https://www.repuestosalsacia.com/alsacia/buscador/search',
                            method: 'POST',
                            headers: headers2,
                            gzip: true,
                            body: dataString2
                        };
                        
                        function callback(error, response, body) {
                            if (!error && response.statusCode == 200) {
                        
                                const $ = cheerio.load(body);
                                console.log('Alsacia OK')
    
                                const jsonTablesAlsacia = HtmlTableToJson.parse('<table>'+$('table').html().replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace('Descripción', 'Descripcion').replace('Año Ini', 'AñoI').replace('Año Fin', 'AñoT')+'</table>');
                         
                                const jsonTablesRefax = HtmlTableToJson.parse('<table>'+RefaxResult.replace('MARCA', 'Marca').replace('MODELO', 'Modelo').replace('AÑO I', 'AñoI').replace('AÑO T', 'AñoT').replace('PRODUCTO', 'Producto').replace('DESCRIPCION', 'Descripcion').replace('ORIGEN', 'Origen').replace('N° REFAX', 'Sku').replace('$ NETO', 'PrecioImportadora').replace('STOCK', 'Stock')+'</table>');
    
                                //next Bicimoto
                                let dataStringTres = 'id_category=&id_subcategory=&id_subsubcategory=&option_filter=&search=' + Buscar + '&order=&register=50';
    
                                let headersTres = {
                                    'authority': 'www.bicimoto.cl',
                                    'accept': 'application/json, text/javascript, */*; q=0.01',
                                    'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
                                    'cache-control': 'no-cache',
                                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                                    'origin': 'https://www.bicimoto.cl',
                                    'pragma': 'no-cache',
                                    'referer': 'https://www.bicimoto.cl/busqueda.php?search=' + Buscar,
                                    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                                    'sec-ch-ua-mobile': '?0',
                                    'sec-ch-ua-platform': '"Windows"',
                                    'sec-fetch-dest': 'empty',
                                    'sec-fetch-mode': 'cors',
                                    'sec-fetch-site': 'same-origin',
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
                                    'x-requested-with': 'XMLHttpRequest',
                                    'Cookie': CookieBicimoto.Cookie
                                };
    
                                var optionsTres = {
                                    url: 'https://www.bicimoto.cl/ajax/load-data-search.php',
                                    method: 'POST',
                                    cookie: CookieBicimoto.Cookie,
                                    headers: headersTres,
                                    body: dataStringTres
                                };
    
                                function callbackTres(error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        var body = JSON.parse(body)
                                        const $ = cheerio.load(body.data);
                                        console.log('Bicimoto OK')
    
                                        $('strong').remove();
                                        $('i').remove();
    
                                        let cantidadB = $('body > div').length + 1;
    
                                        let ProductosB = []
    
                                        for(let i = 1; i < cantidadB; i++){
                                        let Descripcion = $('body > div:nth-child('+ i +') > div > div.producto-box-pack > div.producto-box-datos > h2').text().trim();
                                        let Sku = $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(2)').text().trim();
                                        let Marca = $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(3)').text().trim();
                                        let Modelo = $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(4)').text().trim() + ' ' + $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(5)').text().trim();
                                        let Oem = $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(6)').text().trim();
                                        let Origen =  $('body > div:nth-child('+i+') > div > div.producto-box-pack > div.producto-box-datos > p:nth-child(7)').text().trim()
                                        let PrecioImportadora = $('body > div:nth-child('+i+') > div > div.producto-box-datos-boton > div.producto-box-boton.producto-box-prices > h3').text().replace('$', '').trim()
                                        let Stock = $('body > div:nth-child('+i+') > div > div.producto-box-datos-boton > div:nth-child(2) > button').text().trim() == 'Comprar' ? 'Disponible' : '0'
    
                                        let JsonB = {
                                            Sku,
                                            Descripcion,
                                            Marca,
                                            Modelo,
                                            Oem,
                                            Origen,
                                            PrecioImportadora,
                                            Stock
                                        }
                                            ProductosB.push(JsonB)
    
                                        }
    
                                //Next Mannheim
                                var headersCuatro = {
                                    'authority': 'repuestos.buscalibre.cl',
                                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                                    'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
                                    'cache-control': 'max-age=0',
                                    'cookie': '_gcl_au=1.1.917615709.1649083232; _ga_CLZQ407LJG=GS1.1.1649085157.2.0.1649085220.0; bl_session=cag8j2f4ru2hl6u6gbjjdcv2fg; _ga=GA1.3.850693886.1649083233; _gid=GA1.3.1085283071.1649951418; _ga=GA1.2.850693886.1649083233; _gid=GA1.2.1085283071.1649951418; wcsid=1S31TJKS8WgR0nXe1X61q0T6oD6jrb0k; hblid=0jaLLNNB3KonDgMo1X61q0TrY6mA0ajA; _okdetect=%7B%22token%22%3A%2216499514213730%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D; olfsk=olfsk33225248089623105; _okbk=cd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1649951423011%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd5%3Daway%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; _ok=3092-520-10-6951; _oklv=1649952998326%2C1S31TJKS8WgR0nXe1X61q0T6oD6jrb0k',
                                    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                                    'sec-ch-ua-mobile': '?0',
                                    'sec-ch-ua-platform': '"Windows"',
                                    'sec-fetch-dest': 'document',
                                    'sec-fetch-mode': 'navigate',
                                    'sec-fetch-site': 'none',
                                    'sec-fetch-user': '?1',
                                    'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t',
                                    'upgrade-insecure-requests': '1',
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
                                };
                                
                                var optionsCuatro = {
                                    url: 'https://repuestos.buscalibre.cl/repuestos/search?q=' + Buscar,
                                    headers: headersCuatro
                                };
                                
                                function callback(error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        const $ = cheerio.load(body);
                                        console.log('Mannheim OK')
                                        $('strong').remove()
                                        let Cantidad =  $('#repuestos > div > div').length + 1;
                                        console.log(Cantidad)
                                        let ProductoM = [];
                                        for(let i = 0; i < Cantidad; i++){
                                            let Descripcion = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > h3 > a').text().trim();
                                            let Oem = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div:nth-child(2)').text().trim();
                                            let Fabricante = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div:nth-child(3)').text().trim();
                                            let Origen = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div:nth-child(4)').text().trim();
                                            let PrecioImportadora = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-12.col-md-3 > div > h2').text().replace('$', '').trim();
                                            let Aplicacion = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div.cursor-pointer.ver-aplicaciones.color-dark-gray.margin-bottom-10.margin-top-10').attr('data-part-id')
                                        
                                            ProductoM.push({
                                                Descripcion,
                                                Oem,
                                                Fabricante,
                                                Origen,
                                                PrecioImportadora,
                                                Aplicacion
                                            })                                    
                                        }
    
                                        ProductoM.shift();
                                        ProductoM.pop();
                                        ProductoM.pop();
                                        ProductoM.pop();
                                        
                                        jsonTablesAlsacia.results[0] = jsonTablesAlsacia.results[0].map(e => {
                                            e.Precio = e.Precio.replace('$', '').trim();
                                            return e;
                                        })
    

                                        
                                //next Noriega
                                let headersCinco = {
                                    'cache-control': 'no-cache',
                                    'content-type': 'application/x-www-form-urlencoded'
                                };
                             
                                 var optionsCinco = {
                                     method: 'POST',
                                     url: 'http://ecommerce.noriegavanzulli.cl/b2b/resultado_googleo_texto.jsp',
                                     headers: headersCinco,
                                     form: { texto: Buscar },
                                     jar: jar
                                 };
                             
                                 function callbackCinco(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    const $ = cheerio.load(body);
                                    console.log('Noriega OK')
                                    let Noriega = HtmlTableToJson.parse('<table><thead><th>Marca</th><th>Modelo</th><th>Año</th><th>Producto</th><th>Descripcion</th><th>Origen</th><th>Sku</th><th>Precio</th><th>Stock</th></thead>'+$('tbody').html()+'</table>');
    
                                    SendJson = {
                                        Alsacia: jsonTablesAlsacia.results,
                                        Refax: jsonTablesRefax.results,
                                        Bicimoto: ProductosB,
                                        Mannheim: ProductoM,
                                        Noriega: Noriega.results[0]
                                    }

                    
                                        return res.status(200).send(SendJson);
                                
                                
                                       }

                                    }
                        
                                     
                                        request(optionsCinco, callbackCinco);
                                        // res.status(200).send($('#repuestos > div.lista > div > div.col-xs-12.col-md-3 > div > h2').text());
                                    }
                                }
                                
                                request(optionsCuatro, callback);
                                    }
                                }
    
                                request(optionsTres, callbackTres);
                            }
                        }
                        
                        request(options2, callback);
    
    
                        // end refax request
    
    
                    }
                }
                
                request(options, callback);
    
            } catch (error) {
                res.status(200).send(error)
            }
        }else{
            try {

                var headers = {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
                    'Accept': '*/*',
                    'Accept-Language': 'en-US,en;q=0.5',
                    'Accept-Encoding': 'gzip, deflate, br',
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Origin': 'https://b2b.refaxchile.cl',
                    'Connection': 'keep-alive',
                    'Referer': 'https://b2b.refaxchile.cl/B2BRefax/buscadorA.jsp',
                    'Cookie': CookieRefax.Cookie,
                    'Sec-Fetch-Dest': 'empty',
                    'Sec-Fetch-Mode': 'cors',
                    'Sec-Fetch-Site': 'same-origin'
                };
                
                var dataString = 'html=1&busqueda='+Buscar+'+&usuariop=sasval13&cliente=C77554630';
                
                var options = {
                    url: 'https://b2b.refaxchile.cl/B2BRefax/buscadorA',
                    method: 'POST',
                    headers: headers,
                    gzip: true,
                    body: dataString
                };
                
                function callback(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        let RefaxResult = body;
                        console.log('Refax OK')
                        //Init Alsacia Request
                        var headers2 = {
                            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
                            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                            'Accept-Language': 'en-US,en;q=0.5',
                            'Accept-Encoding': 'gzip, deflate, br',
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Origin': 'https://www.repuestosalsacia.com',
                            'Connection': 'keep-alive',
                            'Referer': 'https://www.repuestosalsacia.com/alsacia/home',
                            'Cookie': 'csrf_cookie_name=f84a0c09e3eb87ec1a369fd7f8850dbd; ci_session='+ CookieAlsacia.Cookie +'; ssupp.vid=vigpZqvCeuxVY; ssupp.visits=1; _ga=GA1.2.63973752.1656705830; _gid=GA1.2.1828128899.1656705830; _gat_gtag_UA_57096536_1=1',
                            'Upgrade-Insecure-Requests': '1',
                            'Sec-Fetch-Dest': 'document',
                            'Sec-Fetch-Mode': 'navigate',
                            'Sec-Fetch-Site': 'same-origin',
                            'Sec-Fetch-User': '?1'
                        };
                        
                        var dataString2 = 'csrf_test_name=f84a0c09e3eb87ec1a369fd7f8850dbd&filter=' + Buscar;
                        
                        var options2 = {
                            url: 'https://www.repuestosalsacia.com/alsacia/buscador/search',
                            method: 'POST',
                            headers: headers2,
                            gzip: true,
                            body: dataString2
                        };
                        
                        function callback(error, response, body) {
                            if (!error && response.statusCode == 200) {
                        
                                const $ = cheerio.load(body);
                                console.log('Alsacia OK')
    
                                const jsonTablesAlsacia = HtmlTableToJson.parse('<table>'+$('table').html().replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace('Descripción', 'Descripcion').replace('Año Ini', 'AñoI').replace('Año Fin', 'AñoT')+'</table>');
                         
                                const jsonTablesRefax = HtmlTableToJson.parse('<table>'+RefaxResult.replace('MARCA', 'Marca').replace('MODELO', 'Modelo').replace('AÑO I', 'AñoI').replace('AÑO T', 'AñoT').replace('PRODUCTO', 'Producto').replace('DESCRIPCION', 'Descripcion').replace('ORIGEN', 'Origen').replace('N° REFAX', 'Sku').replace('$ NETO', 'PrecioImportadora').replace('STOCK', 'Stock')+'</table>');
    
                                //next Noriega
                                let headersTres = {
                                    'cache-control': 'no-cache',
                                    'content-type': 'application/x-www-form-urlencoded', };
                             
                                 var optionsTres = {
                                     method: 'POST',
                                     url: 'http://ecommerce.noriegavanzulli.cl/b2b/resultado_googleo_texto.jsp',
                                     headers: headersTres,
                                     jar: jar,
                                     form: { texto: Buscar }
                                 };
                             
                                 function callbackTres(error, response, body) {
                                if (!error && response.statusCode == 200) {
                                    const $ = cheerio.load(body);
                                    console.log('Noriega OK')
                                    let Noriega = HtmlTableToJson.parse('<table><thead><th>Marca</th><th>Modelo</th><th>Año</th><th>Producto</th><th>Descripcion</th><th>Origen</th><th>Sku</th><th>Precio</th><th>Stock</th></thead>'+$('tbody').html()+'</table>');
    
                                //Next Mannheim
                                var headersCuatro = {
                                    'authority': 'repuestos.buscalibre.cl',
                                    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                                    'accept-language': 'es-ES,es;q=0.9,en;q=0.8',
                                    'cache-control': 'max-age=0',
                                    'cookie': '_gcl_au=1.1.917615709.1649083232; _ga_CLZQ407LJG=GS1.1.1649085157.2.0.1649085220.0; bl_session=cag8j2f4ru2hl6u6gbjjdcv2fg; _ga=GA1.3.850693886.1649083233; _gid=GA1.3.1085283071.1649951418; _ga=GA1.2.850693886.1649083233; _gid=GA1.2.1085283071.1649951418; wcsid=1S31TJKS8WgR0nXe1X61q0T6oD6jrb0k; hblid=0jaLLNNB3KonDgMo1X61q0TrY6mA0ajA; _okdetect=%7B%22token%22%3A%2216499514213730%22%2C%22proto%22%3A%22about%3A%22%2C%22host%22%3A%22%22%7D; olfsk=olfsk33225248089623105; _okbk=cd4%3Dtrue%2Cvi5%3D0%2Cvi4%3D1649951423011%2Cvi3%3Dactive%2Cvi2%3Dfalse%2Cvi1%3Dfalse%2Ccd8%3Dchat%2Ccd6%3D0%2Ccd5%3Daway%2Ccd3%3Dfalse%2Ccd2%3D0%2Ccd1%3D0%2C; _ok=3092-520-10-6951; _oklv=1649952998326%2C1S31TJKS8WgR0nXe1X61q0T6oD6jrb0k',
                                    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                                    'sec-ch-ua-mobile': '?0',
                                    'sec-ch-ua-platform': '"Windows"',
                                    'sec-fetch-dest': 'document',
                                    'sec-fetch-mode': 'navigate',
                                    'sec-fetch-site': 'none',
                                    'sec-fetch-user': '?1',
                                    'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t',
                                    'upgrade-insecure-requests': '1',
                                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36'
                                };
                                
                                var optionsCuatro = {
                                    url: 'https://repuestos.buscalibre.cl/repuestos/search?q=' + Buscar,
                                    headers: headersCuatro
                                };
                                
                                function callback(error, response, body) {
                                    if (!error && response.statusCode == 200) {
                                        const $ = cheerio.load(body);
                                        console.log('Mannheim OK')
                                        $('strong').remove()
                                        let Cantidad =  $('#repuestos > div > div').length + 1;
                                        console.log(Cantidad)
                                        let ProductoM = [];
                                        for(let i = 0; i < Cantidad; i++){
                                            let Descripcion = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > h3 > a').text().trim();
                                            let Oem = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div:nth-child(2)').text().trim();
                                            let Fabricante = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div:nth-child(3)').text().trim();
                                            let Origen = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div:nth-child(4)').text().trim();
                                            let PrecioImportadora = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-12.col-md-3 > div > h2').text().replace('$', '').trim();
                                            let Aplicacion = $('#repuestos > div > div:nth-child('+i+') > div.col-xs-8.col-md-6 > div > div.cursor-pointer.ver-aplicaciones.color-dark-gray.margin-bottom-10.margin-top-10').attr('data-part-id')
                                        
                                            ProductoM.push({
                                                Descripcion,
                                                Oem,
                                                Fabricante,
                                                Origen,
                                                PrecioImportadora,
                                                Aplicacion
                                            })                                    
                                        }
    
                                        ProductoM.shift();
                                        ProductoM.pop();
                                        ProductoM.pop();
                                        ProductoM.pop();
                                        
    
                                        SendJson = {
                                            Alsacia: jsonTablesAlsacia.results,
                                            Refax: jsonTablesRefax.results,
                                            Mannheim: ProductoM,
                                            Bicimoto: [[{Descripcion: ''}]],
                                            Noriega: Noriega._results[0]
                                        }
    
                                        return res.status(200).send(SendJson);
                                    }
                                }
                                
                                request(optionsCuatro, callback);
                                    }
                                }
    
                                request(optionsTres, callbackTres);
                            }
                        }
                        
                        request(options2, callback);
    
    
                        // end refax request
    
    
                    }
                }
                
                request(options, callback);

            } catch (error) {
                return res.status(200).send(SendJson);
            }
        }
    }

    static async POST_CONSULTARGABTEC(req, res){

    let { Codigo } = req.body; 

    let CookieGabtec = await Credenciales.findOne({ Importadora: 'Gabtec' });

    let headers = {
        "accept": "*/*",
        "accept-language": "es-ES,es;q=0.9,en;q=0.8",
        "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
        "sec-ch-ua": "\".Not/A)Brand\";v=\"99\", \"Google Chrome\";v=\"103\", \"Chromium\";v=\"103\"",
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "\"Windows\"",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-origin",
        "token_authorization": "U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t",
        "x-requested-with": "XMLHttpRequest",
        "cookie": CookieGabtec.Cookie,
        "Referer": "https://www.gabtec.cl/",
        "Referrer-Policy": "strict-origin-when-cross-origin"
    };
    
    let dataString = 'codigo='+ Codigo +'&tipbus=codigoCruzado';
    
    let options = {
        url: 'https://www.gabtec.cl/busqueda.php',
        method: 'POST',
        headers: headers,
        gzip: true,
        body: dataString
    };
    
    async function callback(error, response, body) {

        const $ = cheerio.load(body);

        let Json = { 
            Precio: $('div.row.col-12.pr-0.mr-0.my-2.pl-0 > div.col-lg-6.bg-white > div > div.col-12.mt-5 > span > b').text().trim(),
            Stock: $('div.row.col-12.pr-0.mr-0.my-2.pl-0 > div.col-lg-6.bg-white > div > div:nth-child(5) > span').text().trim()
        }

        return res.status(200).send(Json)

    }

   request(options, callback);

   }



   static async POST_CONSULTARAUTOMARCOS(req, res){

    let { Codigo } = req.body; 

    let CookieAutomarco = await Credenciales.findOne({ Importadora: 'Automarco' });


    var headers = {
        'Accept': '*/*',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': CookieAutomarco.Cookie,
        'Origin': 'https://www.automarco.cl',
        'Referer': 'https://www.automarco.cl/index.php',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t'
    };
    
    var dataString = 'codigo='+Codigo+'&tipbus=codigoCruzado';
    
    
    let options = {
        url: 'https://www.automarco.cl/busqueda.php',
        method: 'POST',
        headers: headers,
        gzip: true,
        body: dataString
    };
    
    async function callback(error, response, body) {

        const $ = cheerio.load(body);

        let Json = { 
            Precio: $('span > b').text().trim(),
            Stock: $('div.row.col-12.pr-0.mr-0.my-2.pl-0 > div.col-lg-6.bg-white > div > div:nth-child(7) > span').text().trim()
        }

        return res.status(200).send(Json)

    }

   request(options, callback);

   }


   static async POST_CONSULTARSASVAL(req, res){

    let { Codigo } = req.body; 

    let CookieSasval = await Credenciales.findOne({ Importadora: 'Sasval' });

    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'X-Requested-With': 'XMLHttpRequest',
        'Connection': 'keep-alive',
        'Referer': 'https://www.softnet.cl/sistems/contabilidad/m_productos.php',
        'Cookie': CookieSasval.Cookie,
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
    };
    
    var options = {
        url: 'https://www.softnet.cl/sistems/contabilidad/test/carga_maestro_prod.php?btn_e=&sEcho=3&iColumns=7&sColumns=&iDisplayStart=0&iDisplayLength=10&sSearch='+ Codigo +'&bEscapeRegex=false&sSearch_0=&bEscapeRegex_0=true&bSearchable_0=true&sSearch_1=&bEscapeRegex_1=true&bSearchable_1=true&sSearch_2=&bEscapeRegex_2=true&bSearchable_2=true&sSearch_3=&bEscapeRegex_3=true&bSearchable_3=true&sSearch_4=&bEscapeRegex_4=true&bSearchable_4=true&sSearch_5=&bEscapeRegex_5=true&bSearchable_5=true&sSearch_6=&bEscapeRegex_6=true&bSearchable_6=true&iSortingCols=1&iSortCol_0=0&sSortDir_0=asc&bSortable_0=true&bSortable_1=true&bSortable_2=true&bSortable_3=true&bSortable_4=true&bSortable_5=true&bSortable_6=true',
        headers: headers,
        gzip: true
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            body = JSON.parse(body);
            console.log(body.aaData.length)


            if(body.aaData.length == 0){
                let Json = { 
                    Precio: 0,
                    Stock: 0
                }
                return res.status(200).send(Json)
            }
            let Json = { 
                Precio: body.aaData[0][3],
                Stock: body.aaData[0][4]
            }
    
            return res.status(200).send(Json)

        }
    }
    

    
    request(options, callback);

   }

   static async POST_CONSULTARBODEGASASVAL(req, res){

    let { Codigo } = req.body; 

    let CookieSasval = await Credenciales.findOne({ Importadora: 'Sasval' });

    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Referer': 'https://www.softnet.cl/sistems/contabilidad/m_lista_cprecios2.php',
        'Cookie': CookieSasval.Cookie,
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'iframe',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin'
    };
    
    var options = {
        url: 'https://www.softnet.cl/sistems/contabilidad/listado_bodegas.php?codigo=' + Codigo,
        headers: headers,
        gzip: true
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            res.send($('#item > table:nth-child(2)').html())
        }
    }
    
    request(options, callback);

   }


    static async POST_EXTRAERGABTEC(req, res){

    let GabtecCode = await Gabtec.findOne({ Extraido: false });


        if(!GabtecCode){
            return res.send('sin resultados');
        }

    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Accept': '*/*',
        'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://www.gabtec.cl',
        'Connection': 'keep-alive',
        'Referer': 'https://www.gabtec.cl/',
        'Cookie': 'PHPSESSID=lcm0clui3uk33rmdq67k8vjf40',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
    };
    
    var dataString = 'codigo='+ GabtecCode.CodigoImportadora +'&tipbus=codigoCruzado';
    
    var options = {
        url: 'https://www.gabtec.cl/busqueda.php',
        method: 'POST',
        headers: headers,
        gzip: true,
        body: dataString
    };
    
    async function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
    
    const $ = cheerio.load(body);

    let Cantidad = $('#home > table > tbody > tr').length + 1;

    for (let i = 1; i < Cantidad; i++) {
        let Marca = $('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(1)').text().trim();
        let Modelo = $('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(2)').text().trim();
        let Posicion = $('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(3)').text().trim();
        let AñoI = parseInt($('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(4)').text().trim());
        let AñoT = parseInt($('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(5)').text().trim());
        let Fabricante = $('span > img').attr('src').split('/')[$('span > img').attr('src').split('/').length - 1].replace('.jpg', '');
        let FabricanteImg = $('span > img').attr('src');
        let Img = $('#img-grande > div > a > img').attr('src');

        let Años = [];

        for(let a = AñoI; a < AñoT + 1; a++){
            Años.push(a)
        }

        let Json = {
            CodigoImportadora: GabtecCode.CodigoImportadora,
            Descripcion: GabtecCode.Descripcion,
            Img, 
            Marca,
            Modelo,
            Posicion,
            AñoI,
            AñoT,
            Fabricante,
            FabricanteImg,
            Años,
            Busqueda: GabtecCode.CodigoImportadora + ' ' + GabtecCode.Descripcion + ' ' + Marca + ' ' + Modelo + ' ' + Posicion + ' ' + Fabricante + ' ' + Años 
        }

        new Gabtec(Json).save();
        console.log(Json);
    }
    
    
        await Gabtec.updateOne({ _id: GabtecCode._id }, {$set: { Extraido: true } });

        res.send('Ready')
        
    }
    }
    
    request(options, callback);

    }

    static async POST_EXTRAERAUTOMARCOS(req, res){

        let AutomarcosCode = await Automarcos.findOne({ Extraido: false });
    
            if(!AutomarcosCode){
                return res.send('sin resultados');
            }
    
            var headers = {
                'Accept': '*/*',
                'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
                'Connection': 'keep-alive',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'Cookie': 'compCookie2=19350; PHPSESSID=guphvhqdbt6jctcb67gauscv9b',
                'Origin': 'https://www.automarco.cl',
                'Referer': 'https://www.automarco.cl/index.php',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
                'X-Requested-With': 'XMLHttpRequest',
                'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
                'sec-ch-ua-mobile': '?0',
                'sec-ch-ua-platform': '"Windows"',
                'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t'
            };
            
            var dataString = 'codigo='+AutomarcosCode.Sku+'&tipbus=codigoCruzado';
            
            var options = {
                url: 'https://www.automarco.cl/busqueda.php',
                method: 'POST',
                headers: headers,
                body: dataString
            };
        
        async function callback(error, response, body) {
        if (!error && response.statusCode == 200) {

        const $ = cheerio.load(body);
    
        let Cantidad = $('#home > table > tbody > tr').length + 1;
            console.log(Cantidad, 'cantidad')
        for (let i = 1; i < Cantidad; i++) {
            console.log(i)
            let Marca = $('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(1)').text().trim();
            let Modelo = $('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(2)').text().trim();
            let AñoI = parseInt($('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(3)').text().trim()) || 0;
            let AñoT = parseInt($('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(4)').text().trim()) || 0;
            let Motor = $('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(5)').text().trim();
            let Aplicacion = $('#home > table > tbody > tr:nth-child('+ i +') > td:nth-child(6)').text().trim();
            let Fabricante = $('span > img').attr('src').split('/')[$('span > img').attr('src').split('/').length - 1].replace('.jpg', '');
            let FabricanteImg = $('span > img').attr('src');
            let Img = $('#img-grande > div > a > img').attr('src');
    
            let Años = [];
    
            for(let a = AñoI; a < AñoT + 1; a++){
                Años.push(a)
            }
    
            let Json = {
                CodigoImportadora: AutomarcosCode.Sku,
                Descripcion: AutomarcosCode.Descripcion,
                Img, 
                Marca,
                Modelo,
                Motor,
                Aplicacion,
                AñoI: AñoI || 0,
                AñoT: AñoT || 0,
                Fabricante,
                FabricanteImg,
                Años,
                Busqueda: AutomarcosCode.Sku + ' ' + AutomarcosCode.Descripcion + ' ' + Marca + ' ' + Modelo + ' ' + Motor + ' ' + Aplicacion +  ' ' + Fabricante + ' ' + Años
            }
    
            new Automarcos(Json).save();
            console.log(Json)
        }
        
        
            await Automarcos.updateOne({ _id: AutomarcosCode._id }, {$set: { Extraido: true } });
    
            res.send('Ready')
            
        }
        }
        
        request(options, callback);
    
        }


    static async POST_CREATEPRODUCTS(req, res){
        try {
            var Datos = JSON.parse(req.body.Datos)
            
            if(Datos == {} || Datos == []){
                return res.status(200).send('No puede enviar un Json Vacio');
            }
            var Actualizados = 0;
            var Creados = 0;
            var Cantidad = 0;
            var Img = 0;
            var NoImg = 0;
            Datos.map(async e => { 
                
                var existe = await Productos.findOne({CodigoModelo: e.CodigoModelo, CodigoImportadora: e.CodigoImportadora});

                if(existe == null){ // CREAR

                    if(e.Importadora == 'Mannheim'){
                        if(e.Oferta == 'Oferta'){
                            e.Oferta = true
                        }else{
                            e.Oferta = false
                        }
                        e.Descripcion = e.Descripcion.replace(" LH/RH ", " IZQUIERDO / DERECHO ").replace(" LH ", " IZQUIERDO ").replace(" RH "," DERECHO ")
                    }

                    await new Productos(e).save()
                    Creados = Creados + 1;

                    if(e.Importadora == 'Alsacia'){
                        var options = { method: 'GET', url: e.Img, headers: { 'cache-control': 'no-cache' } };
                        request(options, async function (error, response, body) {
                            if(response){
                                const destFileName = `${path.join(__dirname, '../uploads/repuestos/', e.CodigoImportadora)}.jpg`;
                                request(e.Img).pipe(fs.createWriteStream(destFileName));
                                await Productos.updateMany({ CodigoImportadora: e.CodigoImportadora, Importadora: 'Alsacia' }, {$set: { CurrentImg: e.CodigoImportadora } })
                            }else{
                                await Productos.updateMany({ CodigoImportadora: e.CodigoImportadora, Importadora: 'Alsacia' }, {$set: { CurrentImg: 'default' } })
                            }
                    })
                    }else if(e.Importadora == 'Refax'){
                        var options = { method: 'GET', url: "https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + e.CodigoImportadora + "/" + e.CodigoImportadora + "A.jpg", headers: { 'cache-control': 'no-cache' } };
                        request(options, async function (error, response, body) {
                            if(response.headers['content-type'] == 'image/jpeg'){
                                const destFileName = `${path.join(__dirname, '../uploads/repuestos/', e.CodigoImportadora)}.jpg`;
                                request("https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + e.CodigoImportadora + "/" + e.CodigoImportadora + "A.jpg").pipe(fs.createWriteStream(destFileName));
                                await Productos.updateMany({ CodigoImportadora: e.CodigoImportadora, Importadora: 'Refax' }, {$set: { CurrentImg: e.CodigoImportadora } })
                            }else{
                                await Productos.updateMany({ CodigoImportadora: e.CodigoImportadora, Importadora: 'Refax' }, {$set: { CurrentImg: 'default' } })
                            }
                    })
                    }else if(e.Importadora == 'Mannheim'){
                        var options = { method: 'GET', url: `http://200.73.35.244:8080/webclient/images/${ e.OEM }.jpg`, headers: { 'cache-control': 'no-cache' } };
                        request(options, async function (error, response, body) {
                            if(response.headers['content-type'] == 'image/jpeg'){
                                const destFileName = `${path.join(__dirname, '../uploads/repuestos/', e.CodigoImportadora)}.jpg`;
                                request(`http://200.73.35.244:8080/webclient/images/${ e.OEM }.jpg`).pipe(fs.createWriteStream(destFileName));
                                await Productos.updateMany({ CodigoImportadora: e.CodigoImportadora, Importadora: 'Mannheim' }, {$set: { CurrentImg: e.CodigoImportadora } })
                            }else{
                                await Productos.updateMany({ CodigoImportadora: e.CodigoImportadora, Importadora: 'Mannheim' }, {$set: { CurrentImg: 'default' } })
                            }
                    })
                    }else if(e.Importadora == 'Bicimoto'){
                        var options = { method: 'GET', url: e.Img, headers: { 'cache-control': 'no-cache' } };
                        request(options, async function (error, response, body) {
                            if(response.headers['content-type'] == 'image/jpeg'){
                                const destFileName = `${path.join(__dirname, '../uploads/repuestos/', e.CodigoImportadora)}.jpg`;
                                request(e.Img).pipe(fs.createWriteStream(destFileName));
                                await Productos.updateMany({ CodigoImportadora: e.CodigoImportadora, Importadora: 'Bicimoto' }, {$set: { CurrentImg: e.CodigoImportadora } })
                            }else{
                                await Productos.updateMany({ CodigoImportadora: e.CodigoImportadora, Importadora: 'Bicimoto' }, {$set: { CurrentImg: 'default' } })
                            }
                    })
                    }
                }else{ // ACTUALIZAR
                    if(e.Importadora == 'Bicimoto'){
                        await Productos.updateMany({CodigoModelo: e.CodigoModelo, CodigoImportadora: e.CodigoImportadora}, {$set: { Stock: e.Stock, PrecioImportadora: e.PrecioImportadora, OEM: e.OEM } });
                    }else{
                        await Productos.updateMany({CodigoModelo: e.CodigoModelo, CodigoImportadora: e.CodigoImportadora}, {$set: { Stock: e.Stock, PrecioImportadora: e.PrecioImportadora } });
                    }
                   Actualizados = Actualizados + 1;
                }

                Cantidad = Cantidad  + 1;

                if(Cantidad == Datos.length){ // ACTUALIZAR MODELO
                    if(e.Importadora == 'Refax'){
                        await Modelos.updateOne({CodigoModelo: e.CodigoModelo }, {$set: { LastUpdateRefax: new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago'  }) } })
                    }else if(e.Importadora == 'Alsacia'){
                        await Modelos.updateOne({CodigoModelo: e.CodigoModelo }, {$set: { LastUpdateAlsacia: new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago'  }) } })
                    }else if(e.Importadora == 'Bicimoto'){
                        await Modelos.updateOne({CodigoModelo: e.CodigoModelo }, {$set: { LastUpdateBicimoto: new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago'  }) } })
                    }else if(e.Importadora == 'Mannheim'){
                        await Modelos.updateOne({CodigoModelo: e.CodigoModelo }, {$set: { LastUpdateMannheim: new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago'  }) } })
                    }
                    //Eliminar los que no estuvieron listados
                    let today = new Date()
                    let yesterday = new Date(today)
                    yesterday.setDate(yesterday.getDate() - 1)
                    await Productos.updateMany({ 
                        $and: [
                          {updatedAt: {$gte: new Date("2022-03-01T00:00:00.000Z")}},
                          {updatedAt: {$lte: new Date(yesterday)}},
                          {CodigoModelo: e.CodigoModelo},
                          {Importadora: e.Importadora}
                        ]
                      }, {$set: { Stock: 'DESCONTINUADO' }})

                    return res.status(200).json({Cantidad: Datos.length, Importadora: e.Importadora, Actualizados, Creados})
                }
             })

        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }



    static async POST_APLICACIONESR(req, res){
        let { CodigoImportadora } = req.body;
        

        let CookieRefax = await Credenciales.findOne({ Importadora: 'Refax' });

        var headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
            'Accept': '*/*',
            'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
            'Accept-Encoding': 'gzip, deflate, br',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'Origin': 'https://b2b.refaxchile.cl',
            'Connection': 'keep-alive',
            'Referer': 'https://b2b.refaxchile.cl/B2BRefax/producto.jsp?idArticulo='+ CodigoImportadora +'&tipo=D',
            'Cookie': CookieRefax.Cookie,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin'
        };
        
        var dataString = 'tipo=APLICACIONES&idArticulo=' + CodigoImportadora;
        
        var options = {
            url: 'https://b2b.refaxchile.cl/B2BRefax/productoAplicaciones',
            method: 'POST',
            headers: headers,
            gzip: true,
            body: dataString
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                 
                res.status(200).send(body)
            }
        }
        
        request(options, callback);
        


    }


    static async POST_APLICACIONESM(req, res){
        try {
            console.log(req.body)
            var options = { method: 'GET',
            url: 'https://repuestos.buscalibre.cl/v2/repuestos/aplicaciones/'+ req.body.Aplicacion,
            headers: { 'cache-control': 'no-cache' } };

            request(options, function (error, response, body) {
            if (error) throw new Error(error);
                return res.status(200).send(body)
            });
        } catch (error) {
            return res.status(200).send(error)
        }
    }

    static async POST_CREATELINK(req, res){
        try {

            var { Importadora, CodigoModelo, Url } = req.body;

            if(Importadora == 'Refax'){
                await Modelos.updateOne({ CodigoModelo: CodigoModelo }, {$set: { Url: Url } })
            }
            if(Importadora == 'Alsacia'){
                await Modelos.updateOne({ CodigoModelo: CodigoModelo }, {$set: { UrlAlsacia: Url } })
            }
            if(Importadora == 'Bicimoto'){
                await Modelos.updateOne({ CodigoModelo: CodigoModelo }, {$set: { UrlBicimoto: Url } })
            }

            return res.status(200).json('Los cambios se han guardado con exito.')
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    

    static async POST_REFAX_AUTH(req, res){
        request.get({
            url: 'https://b2b.refaxchile.cl/B2BRefax/autentificadorRefax.rfx?token=GEqnpwIe+tu9zPwXfpByYJ5XLTEQsjk8ThE2idVi2judymLjCmgbmkZ+E8DDfOKEEc+OhuwDt7+m+GS9ufPnXV4Jjuls9lgE23EXDmKa15woK5qzXxbYKbEjrLtkHJfMEwhsWHMgUkauM23snBx7C1G2KfJVXdOF+3yemC3WhiW/8krGLksozAqvy+uU90EhwdHNFi4pM73g5anJ1EoLd9tyJ/iwB1q8HDauA3fydOeWuc5dO0d9rGRtXP3RrPWfCS0nhVdT3BXJb7yqF4EXYg==',
            headers: { 
              "accept": "application/json, text/javascript, */*; q=0.01",
              "accept-language": "es-ES,es;q=0.9,en;q=0.8",
              "sec-ch-ua": "\" Not;A Brand\";v=\"99\", \"Google Chrome\";v=\"97\", \"Chromium\";v=\"97\"",
              "sec-ch-ua-mobile": "?0",
              "sec-ch-ua-platform": "\"Windows\"",
              "sec-fetch-dest": "empty",
              "sec-fetch-mode": "cors",
              "sec-fetch-site": "cross-site",
              "token_authorization": "U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t",
              "Referer": "https://b2b.refaxchile.cl/",
              "Referrer-Policy": "strict-origin-when-cross-origin",
            },
            jar: jar,
             "body": null,
             "method": "GET",
        }, async function(err, response, body){
            if(err) {
              return console.error(err);
            };
            
            let CookieRefax = jar._jar.store.idx["b2b.refaxchile.cl"]["/B2BRefax"]["JSESSIONID"].value;
      
            console.log('JSESSIONID='+CookieRefax+';')

            await Credenciales.updateOne({ Importadora: 'Refax' }, {$set: { Cookie: 'JSESSIONID='+CookieRefax+';' } })

            res.status(200).send('EXITO');

        })
    }



    static async POST_BICIMOTO_AUTH(req, res){
        
        let environment = process.env.NODE_ENV || 'development';

        console.log(environment)

        if(environment == 'development'){
            request.post({
                url: 'https://www.bicimoto.cl/ajax/process-login.php',
                headers: { 
                    'authority': 'www.bicimoto.cl',
                    'sec-ch-ua': '" Not;A Brand";v="99", "Google Chrome";v="97", "Chromium";v="97"',
                    'accept': 'application/json, text/javascript, */*; q=0.01',
                    'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
                    'x-requested-with': 'XMLHttpRequest',
                    'sec-ch-ua-mobile': '?0',
                    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.99 Safari/537.36',
                    'sec-ch-ua-platform': '"Windows"',
                    'origin': 'https://www.bicimoto.cl',
                    'sec-fetch-site': 'same-origin',
                    'sec-fetch-mode': 'cors',
                    'sec-fetch-dest': 'empty',
                    'referer': 'https://www.bicimoto.cl/login'
                 },
                method: 'post',
                jar: jar,
                body: 'rut=77.177.455-5&office=0&password=chipto001&remember=1&auth_token=ee806c1a54fdbe221912450f6d483015b5da32b6d57b4ea834cb08ed18eb28a2'
            }, async function(err, response, body){
                if(err) {
                  return console.error(err);
                };
    
                let CookieBicimoto = jar._jar.store.idx["www.bicimoto.cl"]["/"].BICMTO_FRONT.value;
    
                await Credenciales.updateOne({ Importadora: 'Bicimoto' }, {$set: { Cookie: 'BICMTO_FRONT='+CookieBicimoto+';' } })
    
                res.status(200).send('EXITO');
    
    
            })
        }else{
            res.status(200).send('Ok')
        }
    }

    static async POST_SASVAL_AUTH(req, res){
    var headers = {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        'Cache-Control': 'max-age=0',
        'Connection': 'keep-alive',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://www.softnet.cl',
        'Referer': 'https://www.softnet.cl/sistems/contabilidad/login.php',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        'Upgrade-Insecure-Requests': '1',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
        'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t',
        jar: jar,
    };
    
    var dataString = 'empresa=77554630-1&usuario=genesis&clave=191094&aceptarlogin=Ingresar';
    
    var options = {
        url: 'https://www.softnet.cl/sistems/contabilidad/login.php',
        method: 'POST',
        headers: headers,
        body: dataString,
        jar: jar,
    };
    
    async function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);

            let CookieSasval = jar._jar.store.idx["www.softnet.cl"]["/"].PHPSESSID.value;
    
            await Credenciales.updateOne({ Importadora: 'Sasval' }, {$set: { Cookie: 'PHPSESSID='+CookieSasval+';' } })

            res.status(200).send('EXITO');


        }
    }
    
    request(options, callback);
}

static async POST_AUTOMARCO_AUTH(req, res){
var headers = {
    'Accept': '*/*',
    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
    'Connection': 'keep-alive',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Origin': 'https://www.automarco.cl',
    'Referer': 'https://www.automarco.cl/index.php',
    'Sec-Fetch-Dest': 'empty',
    'Sec-Fetch-Mode': 'cors',
    'Sec-Fetch-Site': 'same-origin',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
    'X-Requested-With': 'XMLHttpRequest',
    'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t',
    jar: jar,
};

var dataString = 'mail=chilerepuestos@outlook.com&pass=6087';

var options = {
    url: 'https://www.automarco.cl/codigo.php',
    method: 'POST',
    headers: headers,
    body: dataString,
    jar: jar,
};

 async function callback(error, response, body) {
    if (!error && response.statusCode == 200) {

        let CookieAutomarco = jar._jar.store.idx["www.automarco.cl"]["/"].PHPSESSID.value;
    
        await Credenciales.updateOne({ Importadora: 'Automarco' }, {$set: { Cookie: 'PHPSESSID='+CookieAutomarco+';' } })

        res.status(200).send('EXITO');

    }
}

request(options, callback);

}


static async POST_GABTEC_AUTH(req, res){
    var headers = {
        'sec-ch-ua': '".Not/A)Brand";v="99", "Google Chrome";v="103", "Chromium";v="103"',
        'sec-ch-ua-mobile': '?0',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*',
        'Referer': 'https://www.gabtec.cl/index.php',
        'X-Requested-With': 'XMLHttpRequest',
        'sec-ch-ua-platform': '"Windows"'
    };
    
    var dataString = 'codigo=5104&mail=chilerepuestos@outlook.com';
    
    var options = {
        url: 'https://www.gabtec.cl/script-codigo.php',
        method: 'POST',
        headers: headers,
        body: dataString
    };
    
     async function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
    
            console.log(body);

            return res.send(jar._jar.store.idx)
            let CookieGabtec = jar._jar.store.idx["www.gabtec.cl"]["/"].PHPSESSID.value;
        
            await Credenciales.updateOne({ Importadora: 'Gabtec' }, {$set: { Cookie: 'PHPSESSID='+CookieGabtec+';' } })
    
            res.status(200).send('EXITO');
    
        }
    }
    
    request(options, callback);
    
    }


    static async POST_NORIEGA_AUTH(req, res){
        try {
            var headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Origin': 'http://ecommerce.noriegavanzulli.cl',
                'Connection': 'keep-alive',
                'Referer': 'http://ecommerce.noriegavanzulli.cl/b2b/login.jsp?Ingresar=Ingresar',
                'Upgrade-Insecure-Requests': '1'
            };
            
            var dataString = 'trut=77177455&tuser=compras&tpass=062&Ingresar=Ingresar';
            
            var options = {
                url: 'http://ecommerce.noriegavanzulli.cl/b2b/login_conf.jsp',
                method: 'POST',
                headers: headers,
                gzip: true,
                body: dataString,
                jar: jar
            };
            
            async function callback(error, response, body) {
                if (!error && response.statusCode == 200) {

                    let CookieNoriega = jar._jar.store.idx["ecommerce.noriegavanzulli.cl"]["/"].JSESSIONID.value;

                    await Credenciales.updateOne({ Importadora: 'Noriega' }, {$set: { Cookie: 'JSESSIONID='+CookieNoriega+';' } })
        
                    res.status(200).send('EXITO');

                }
            }
            
            request(options, callback);

        } catch (error) {
            res.status(200).send(error)
        }
    }




    static async GET_PRODUCTS_BY_MODELOID(req, res){
        try {
            // Inicio
            const perPage = 30
            const page = parseInt(req.params.page) || 1
            const CodigoModelo = req.params.CodigoModelo;

            var Datos = await Productos.find({ CodigoModelo, Stock: {$ne: "0" } }).skip((perPage * page) - perPage).limit(perPage).sort({ Descripcion: 1})

            return res.json(Datos)

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }



    static async GET_PRODUCT_BY_ID(req, res){
        try {
            var { id } = req.params;

            var Product = await Productos.findOne({ _id: id });

            return res.json(Product)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    static async POST_PRODUCT_SEARCH(req, res){
        try {
            // Inicio
            var CodigoModelo = req.body.CodigoModelo;
            var Stock = {$ne: '0'}
            var Descripcion = req.body.Descripcion.slice()
            
            Descripcion.split(' ');
            var Descripcion = Descripcion.split(' ')

            let i = 0
            var reset = () => { i = 0; return i }
            var next = () => { i++; return i }

            if (Descripcion.length == 1) {
                var Datos = await Productos.find({ $and: [{ $or: [{ Descripcion: new RegExp(Descripcion[0], 'i') }, { OEM: Descripcion[0] } ] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
                var Count = await Productos.countDocuments({ $and: [{ $or: [{ Descripcion: new RegExp(Descripcion[0], 'i') }, { OEM: Descripcion[0] } ] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
            }else if(Descripcion.length == 2) {
                var Datos = await Productos.find({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
                var Count = await Productos.countDocuments({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
            }else if(Descripcion.length == 3) {
                var Datos = await Productos.find({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
                var Count = await Productos.countDocuments({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
            }else if(Descripcion.length == 4) {
                var Datos = await Productos.find({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
                var Count = await Productos.countDocuments({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
            }else if(Descripcion.length == 5) {
                var Datos = await Productos.find({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
                var Count = await Productos.countDocuments({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {CodigoModelo: CodigoModelo} ] }).limit(30)
            }

            return res.json({Datos, Count})

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    static async POST_LINEA_SEARCH(req, res){
        try {
            // Inicio
            var MarcaVehiculo = req.body.MarcaVehiculo;
            var Stock = {$ne: '0'}
            var Descripcion = req.body.Descripcion.slice()
            
            Descripcion.split(' ');
            var Descripcion = Descripcion.split(' ')

            let i = 0
            var reset = () => { i = 0; return i }
            var next = () => { i++; return i }

            if (Descripcion.length == 1) {
                var Datos = await Productos.find({ $and: [{ $or: [{ Descripcion: new RegExp(Descripcion[0], 'i') }, { OEM: Descripcion[0] } ] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
                var Count = await Productos.countDocuments({ $and: [{ $or: [{ Descripcion: new RegExp(Descripcion[0], 'i') }, { OEM: Descripcion[0] } ] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
            }else if(Descripcion.length == 2) {
                var Datos = await Productos.find({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
                var Count = await Productos.countDocuments({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
            }else if(Descripcion.length == 3) {
                var Datos = await Productos.find({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
                var Count = await Productos.countDocuments({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
            }else if(Descripcion.length == 4) {
                var Datos = await Productos.find({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
                var Count = await Productos.countDocuments({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
            }else if(Descripcion.length == 5) {
                var Datos = await Productos.find({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
                var Count = await Productos.countDocuments({ $and: [ { $or: [ { $and: [{ Descripcion: new RegExp(Descripcion[reset()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[next()], 'i') }, { Descripcion: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }, { Stock: {$ne: "0" } }, {MarcaVehiculo: MarcaVehiculo} ] }).sort({CodigoImportadora: -1})
            }

            return res.json({Datos, Count})

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }



    static async POST_OFERTAS(req, res){
        try {
            let { Repuesto } = req.body;

            var Datos = await Productos.find({$and: [ { Descripcion: new RegExp(Repuesto, 'i') },{ Oferta: true }, { Stock: {$ne: '0'}} ]}).limit(8);
            
            return res.status(200).send(Datos)
        } catch (error) {
            console.log(error);
            return res.status(200).send(error)
        }
    }


    static async POST_POPULARES(req, res){
        try {

            let { Repuesto } = req.body;
            if(!Repuesto){
                var Datos = await Productos.find({ Popular: true, Stock: {$ne: '0'} }).limit(8);
                
                return res.status(200).send(Datos)
            }else{
                var Datos = await Productos.find({$and: [ { Descripcion: new RegExp(Repuesto, 'i') }, { Stock: {$ne: '0'}} ]}).sort({_id: -1}).limit(10);
            }
        } catch (error) {
            console.log(error);
            return res.status(200).send(error)
        }
    }

    static async POST_ULTIMOS_PRODUCTOS(req, res){
        try {

            var Datos = await Productos.find({Stock: {$ne: '0'}, Importadora: {$ne: 'Refax'}, Importadora: {$ne: 'Alsacia'} }).sort({_id: -1}).limit(8);
            
            return res.status(200).send(Datos)
        } catch (error) {
            console.log(error);
            return res.status(200).send(error)
        }
    }


    static async PRODUCT_CHANGE_DESCRIPCTION(req, res){
        try {
           var { Importadora, Descripcion, OEM, CodigoImportadora } = req.body;

           console.log(req.body)
            
            if(Importadora == 'Mannheim'){
                var response = await Productos.updateMany({ Importadora: Importadora, OEM: OEM}, {$set: { Descripcion: Descripcion } })
            }else{
                var response = await Productos.updateMany({ Importadora: Importadora, CodigoImportadora: CodigoImportadora}, {$set: { Descripcion: Descripcion } })
            }

            res.status(200).send(response)

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    // PRODUCT_MARKETPLACE
    static async PRODUCT_MARKETPLACE(req, res){
        try {
           var { Importadora, CodigoImportadora, OEM, Marketplace } = req.body;

            if(Importadora == 'Mannheim'){
                var response = await Productos.updateMany({ Importadora: Importadora, OEM: OEM}, {$set: { Marketplace: Marketplace } })
            }else{
                var response = await Productos.updateMany({ Importadora: Importadora, CodigoImportadora: CodigoImportadora}, {$set: { Marketplace: Marketplace } })
            }

            res.status(200).send('response')

            // Fin 
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    //CRUD MARCAS
    static async GET_MARCAS(req, res){
        try {
            var response = await Marcas.find({});
            return res.status(200).json(response)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    //CRUD MODELOS
    static async GET_MODELS(req, res){
        try {
            var Models = await Modelos.find({});
            return res.status(200).json(Models)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    static async GET_MODEL(req, res){
        try {
            var { id } = req.params;
            var Model = await Modelos.findOne({CodigoModelo:  id });
            return res.status(200).json(Model)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    static async GET_MODELSBYMARCA(req, res){
        try {
            var { id } = req.params;
            var response = await Modelos.find({CodigoMarcaVehiculo: parseInt(id) }).sort({Modelo: 1});
            return res.status(200).json(response)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    static async POST_MODELS_SEARCH(req, res){
        try {
            var Descripcion = req.body.key.slice()

            var Descripcion = key.split(' ')

          let i = 0
          var reset = () => { i = 0; return i }
          var next = () => { i++; return i }

        if (Descripcion.length == 1) {
            var Datos = await Modelos.find({ $and: [{ $or: [{ Buscador: new RegExp(Descripcion[0], 'i') }] }] })
            var Count = await Modelos.countDocuments({ $and: [{ $or: [{ Buscador: new RegExp(Descripcion[0], 'i') } ] }] })
        }else if(Descripcion.length == 2) {
            var Datos = await Modelos.find({ $and: [ { $or: [ { $and: [{ Buscador: new RegExp(Descripcion[reset()], 'i') }, { Buscador: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }] })
            var Count = await Modelos.countDocuments({ $and: [ { $or: [ { $and: [{ Buscador: new RegExp(Descripcion[reset()], 'i') }, { Buscador: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }] })
        }else if(Descripcion.length == 3) {
            var Datos = await Modelos.find({ $and: [ { $or: [ { $and: [{ Buscador: new RegExp(Descripcion[reset()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }] })
            var Count = await Modelos.countDocuments({ $and: [ { $or: [ { $and: [{ Buscador: new RegExp(Descripcion[reset()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }] })
        }else if(Descripcion.length >= 4) {
            var Datos = await Modelos.find({ $and: [ { $or: [ { $and: [{ Buscador: new RegExp(Descripcion[reset()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }] })
            var Count = await Modelos.countDocuments({ $and: [ { $or: [ { $and: [{ Buscador: new RegExp(Descripcion[reset()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }] })
        }else if(Descripcion.length == 5) {
            var Datos = await Modelos.find({ $and: [ { $or: [ { $and: [{ Buscador: new RegExp(Descripcion[reset()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }] })
            var Count = await Modelos.countDocuments({ $and: [ { $or: [ { $and: [{ Buscador: new RegExp(Descripcion[reset()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[next()], 'i') }, { Buscador: new RegExp(Descripcion[Descripcion.length - 1], 'i') }] }] }] })
        }
        
        
        return res.json({Datos, Count, ProductosCount})


        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    static async POST_COUNT_PRODUCT_BY_MODELS(req, res){
        try {

            var { CodigoModelo } = req.body;


            var AlsaciaCount = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Alsacia' })
            var AlsaciaCountD = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Alsacia', Stock: {$ne: "0" } })
            var AlsaciaCountA = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Alsacia', Stock: "0" })
            var RefaxCount = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Refax' })
            var RefaxCountD = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Refax', Stock: {$ne: "0" } })
            var RefaxCountA = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Refax', Stock: "0" })
            var BicimotoCount = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Bicimoto' })
            var BicimotoCountD = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Bicimoto', Stock: {$ne: "0" } })
            var BicimotoCountA = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Bicimoto', Stock: "0" })
            var MannheimCount = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Mannheim' })
            var MannheimCountD = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Mannheim', Stock: {$ne: "0" } })
            var MannheimCountA = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Importadora: 'Mannheim', Stock: "0" })
            var Modelo = await Modelos.findOne({ CodigoModelo: parseInt(CodigoModelo) })
            var ProductosList = await Productos.find({ CodigoModelo: parseInt(CodigoModelo), Stock: {$ne: "0" } })
            var ProductosCount = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Stock: {$ne: "0" } })
            var ProductosCountA = await Productos.countDocuments({ CodigoModelo: parseInt(CodigoModelo), Stock: "0"  })

            return res.status(200).json({ AlsaciaCount, RefaxCount, BicimotoCount, MannheimCount, Modelo, ProductosList, AlsaciaCountD, RefaxCountD, MannheimCountD, BicimotoCountD, RefaxCountA, AlsaciaCountA, BicimotoCountA, MannheimCountA, ProductosCount, ProductosCountA})
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }
    //CRUD MODELOS
    static async GET_FAMILIES(req, res){
        try {
            var Families = await Familias.find({});
            return res.status(200).json(Families)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    //CRUD MENU
    static async GET_MENU(req, res){
        try {
            var modo = req.params.session;

            if(modo == 'false'){
                var Json = await Menus.findOne({Modo: 'Invitado'});
                res.status(200).send(Json.Menu)
            }else if(modo == 'true'){
                var Json = await Menus.findOne({Modo: 'Usuario'});
                res.status(200).send(Json.Menu)
            }
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }

    //CRUD SLIDERS
    static async GET_SLIDERS(req, res){
        try {
            var Datos = await Sliders.find({});
            return res.status(200).json(Datos)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }


    //CRUD SLIDERS
    static async GET_LINEAS(req, res){
        try {
            var response = await Lineas.find({});
            return res.status(200).json(response)
        } catch (err) {
            return res.status(200).json({ message: err.message});
        }
    }




//Eliminar datos
static async DELETE_ALLPRODUCTS(req, res){
    try {
        // let datos = await Productos.deleteMany({})
        // return res.status(200).json(datos)
        res.send('Desabilitado para eliminar.')
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async DELETE_PRODUCTBYID(req, res){
    try {
        let datos = await Productos.deleteOne({ _id: req.params.id })
        return res.status(200).json(datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async DELETE_PRODUCTBYCI(req, res){
    try {
        let datos = await Productos.deleteMany({ CodigoImportadora: req.params.CodigoImportadora })
        return res.status(200).json(datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async DELETE_PRODUCTSREFAX(req, res){
    try {
        let datos = await Productos.deleteMany({Importadora: 'Refax'})
        return res.status(200).json(datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async DELETE_PRODUCTSALSACIA(req, res){
    try {
        let Datos = await Productos.deleteMany({Importadora: 'Alsacia'})
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async DELETE_PRODUCTSMANNHEIM(req, res){
    try {
        let Datos = await Productos.deleteMany({Importadora: 'Mannheim'})
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async DELETE_PRODUCTSBICIMOTO(req, res){
    try {
        let Datos = await Productos.deleteMany({Importadora: 'Bicimoto'})
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

//Update Productos
static async POST_UPDATEALL(req, res){
    try {
        // var Datos = await Productos.updateMany({}, {$set: { Ubicacion: [{
        //     Bodega: null,
        //     Fila: null,
        //     Columna: null,
        //     Nivel: null,
        //     Filas: [],
        //     Columnas: [],
        //     Niveles: []
        // }] } });
        // return res.status(200).send(Datos)
        return res.status(200).send('k onda')
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async POST_UPDATEBICIMOTO(req, res){
    try {
        var Datos = await Productos.updateMany({Importadora: 'Bicimoto'}, {$set: { Marca: 'DISTINTAS MARCAS' }});
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async POST_UPDATEREFAX(req, res){
    try {
        var Datos = await Productos.updateMany({Importadora: 'Refax'}, req.body);
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async POST_UPDATEMANNHEIM(req, res){
    try {
        var Datos = await Productos.updateMany({Importadora: 'Mannheim'}, req.body);
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async POST_UPDATEALSACIA(req, res){
    try {
        var Datos = await Productos.updateMany({Importadora: 'Alsacia'}, req.body);
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async POST_UPDATEPRODUCTOSCUSTOM(req, res){
    try {
        await Productos.updateMany({}, {$set: { 
            Bodegas: [],
            Columnas: [],
            Filas:  [],
            Niveles:  [] }
        })
        // var datos = await Productos.find({Importadora: 'Alsacia'});
        // for (let i = 0; i < datos.length; i++) {
        //     await Productos.updateOne({_id: datos[i]._id }, {$set: { Img: datos[i].ImgImportadora } })
        // }
        return res.status(200).json({response: 'listo'})
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


//UNSET
static async POST_UNSETALL(req, res){
    try {
        // var Datos = await Productos.updateMany({}, {$unset: { 
        //     Bodegas: [],
        //     Columnas: [],
        //     Filas:  [],
        //     Niveles:  [] }
        // });
        // return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async GET_UNSETREFAX(req, res){
    try {
        var Datos = await Productos.updateMany({ Importadora: 'Refax' }, {$unset: req.body });
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async GET_UNSETMANNHEIM(req, res){
    try {
        var Datos = await Productos.updateMany({ Importadora: 'Mannheim' }, {$unset: req.body });
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async GET_UNSETALSACIA(req, res){
    try {
        var Datos = await Productos.updateMany({ Importadora: 'Alsacia' }, {$unset: req.body });
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async GET_UNSETBICIMOTO(req, res){
    try {
        var Datos = await Productos.updateMany({ Importadora: 'Bicimoto' }, {$unset: req.body });
        return res.status(200).json(Datos)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}



//IMG CONTROLLER
static async GET_HAVEIMG(req, res){
    try {
        var datos = await Productos.find({ HaveImg: undefined }).limit(100);
        for (let i = 0; i < datos.length; i++) {
            if(datos[i].Importadora == 'Alsacia'){
                var options = { method: 'GET', url: datos[i].Img, headers: { 'cache-control': 'no-cache' } };
                request(options, async function (error, response, body) {
                    if(response){
                        const destFileName = `${path.join(__dirname, '../uploads/repuestos/', datos[i].CodigoImportadora)}.jpg`;
                        request(datos[i].Img).pipe(fs.createWriteStream(destFileName));
                        await Productos.updateMany({ CodigoImportadora: datos[i].CodigoImportadora, Importadora: 'Alsacia' }, {$set: { HaveImg: true } })
                    }else{
                        await Productos.updateMany({ CodigoImportadora: datos[i].CodigoImportadora, Importadora: 'Alsacia' }, {$set: { HaveImg: false } })
                    }
            })
            }else if(datos[i].Importadora == 'Refax'){
                var options = { method: 'GET', url: "https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + datos[i].CodigoImportadora + "/" + datos[i].CodigoImportadora + "A.jpg", headers: { 'cache-control': 'no-cache' } };
                request(options, async function (error, response, body) {
                    if(response.headers['content-type'] == 'image/jpeg'){
                        const destFileName = `${path.join(__dirname, '../uploads/repuestos/', datos[i].CodigoImportadora)}.jpg`;
                        request("https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + datos[i].CodigoImportadora + "/" + datos[i].CodigoImportadora + "A.jpg").pipe(fs.createWriteStream(destFileName));
                        await Productos.updateMany({ CodigoImportadora: datos[i].CodigoImportadora, Importadora: 'Refax' }, {$set: { HaveImg: true } })
                    }else{
                        await Productos.updateMany({ CodigoImportadora: datos[i].CodigoImportadora, Importadora: 'Refax' }, {$set: { HaveImg: false } })
                    }
            })
            }else if(datos[i].Importadora == 'Mannheim'){
                var options = { method: 'GET', url: `http://200.73.35.244:8080/webclient/images/${ datos[i].OEM }.jpg`, headers: { 'cache-control': 'no-cache' } };
                request(options, async function (error, response, body) {
                    if(response.headers['content-type'] == 'image/jpeg'){
                        const destFileName = `${path.join(__dirname, '../uploads/repuestos/', datos[i].CodigoImportadora)}.jpg`;
                        request(`http://200.73.35.244:8080/webclient/images/${ datos[i].OEM }.jpg`).pipe(fs.createWriteStream(destFileName));
                        await Productos.updateMany({ CodigoImportadora: datos[i].CodigoImportadora, Importadora: 'Mannheim' }, {$set: { HaveImg: true } })
                    }else{
                        await Productos.updateMany({ CodigoImportadora: datos[i].CodigoImportadora, Importadora: 'Mannheim' }, {$set: { HaveImg: false } })
                    }
            })
            }else if(datos[i].Importadora == 'Bicimoto'){
                var options = { method: 'GET', url: datos[i].Img, headers: { 'cache-control': 'no-cache' } };
                request(options, async function (error, response, body) {
                    if(response.headers['content-type'] == 'image/jpeg'){
                        const destFileName = `${path.join(__dirname, '../uploads/repuestos/', datos[i].CodigoImportadora)}.jpg`;
                        request(datos[i].Img).pipe(fs.createWriteStream(destFileName));
                        await Productos.updateMany({ CodigoImportadora: datos[i].CodigoImportadora, Importadora: 'Bicimoto' }, {$set: { HaveImg: true } })
                    }else{
                        await Productos.updateMany({ CodigoImportadora: datos[i].CodigoImportadora, Importadora: 'Bicimoto' }, {$set: { HaveImg: false } })
                    }
            })
            }
            // await Productos.updateOne({_id: datos[i]._id }, {$set: { Img: datos[i].ImgImportadora } })
        }        
        
        return res.status(200).json({response: 'listo'})
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}
static async IMG_CONTROLLER(req, res){
    var { CodigoImportadora, OEM, Importadora, Accion, Img } = req.body;
    console.log(CodigoImportadora, OEM, Importadora, Accion, Img, '123')

    if(Accion == 'asignar'){

        if(Importadora == 'Alsacia'){
            var options = { method: 'GET', url: Img, headers: { 'cache-control': 'no-cache' } };
            request(options, async function (error, response, body) {
                if(response){
                    const destFileName = `${path.join(__dirname, '../uploads/repuestos/', CodigoImportadora)}.jpg`;
                    request(Img).pipe(fs.createWriteStream(destFileName));
                    await Productos.updateMany({ CodigoImportadora: CodigoImportadora, Importadora: 'Alsacia' }, {$set: { CurrentImg: CodigoImportadora } })
                }else{
                    await Productos.updateMany({ CodigoImportadora: CodigoImportadora, Importadora: 'Alsacia' }, {$set: { CurrentImg: 'default' } })
                }
        })
        }else if(Importadora == 'Refax'){
            var options = { method: 'GET', url: "https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + CodigoImportadora + "/" + CodigoImportadora + "A.jpg", headers: { 'cache-control': 'no-cache' } };
            request(options, async function (error, response, body) {
                if(response.headers['content-type'] == 'image/jpeg'){
                    const destFileName = `${path.join(__dirname, '../uploads/repuestos/', CodigoImportadora)}.jpg`;
                    request("https://img.refaxchile.cl:9092/FOTOGRAFIAS/" + CodigoImportadora + "/" + CodigoImportadora + "A.jpg").pipe(fs.createWriteStream(destFileName));
                    await Productos.updateMany({ CodigoImportadora: CodigoImportadora, Importadora: 'Refax' }, {$set: { CurrentImg: CodigoImportadora } })
                    console.log('se guardo la imagen?')
                }else{
                    await Productos.updateMany({ CodigoImportadora: CodigoImportadora, Importadora: 'Refax' }, {$set: { CurrentImg: 'default' } })
                    console.log('No se guardo')
                }
        })
        }else if(Importadora == 'Mannheim'){
            var options = { method: 'GET', url: `http://200.73.35.244:8080/webclient/images/${ OEM }.jpg`, headers: { 'cache-control': 'no-cache' } };
            request(options, async function (error, response, body) {
                if(response.headers['content-type'] == 'image/jpeg'){
                    const destFileName = `${path.join(__dirname, '../uploads/repuestos/', e.CodigoImportadora)}.jpg`;
                    request(`http://200.73.35.244:8080/webclient/images/${ OEM }.jpg`).pipe(fs.createWriteStream(destFileName));
                    await Productos.updateMany({ CodigoImportadora: CodigoImportadora, Importadora: 'Mannheim' }, {$set: { CurrentImg: CodigoImportadora } })
                }else{
                    await Productos.updateMany({ CodigoImportadora: CodigoImportadora, Importadora: 'Mannheim' }, {$set: { CurrentImg: 'default' } })
                }
        })
        }else if(Importadora == 'Bicimoto'){
            var options = { method: 'GET', url: Img, headers: { 'cache-control': 'no-cache' } };
            request(options, async function (error, response, body) {
                if(response.headers['content-type'] == 'image/jpeg'){
                    const destFileName = `${path.join(__dirname, '../uploads/repuestos/', CodigoImportadora)}.jpg`;
                    request(Img).pipe(fs.createWriteStream(destFileName));
                    await Productos.updateMany({ CodigoImportadora: CodigoImportadora, Importadora: 'Bicimoto' }, {$set: { CurrentImg: CodigoImportadora } })
                }else{
                    await Productos.updateMany({ CodigoImportadora: CodigoImportadora, Importadora: 'Bicimoto' }, {$set: { CurrentImg: 'default' } })
                }
        })
        }

    }else if(Accion == 'eliminar'){
        await Productos.updateMany({ CodigoImportadora: CodigoImportadora, Importadora: Importadora }, {$set: { CurrentImg: 'default' } })
    }

    return res.status(200).send('Ready')

}

static async UPLOAD_IMG_REPUESTO(req, res){

    var response = await Productos.updateMany({ CodigoImportadora: req.file.originalname }, {$set: { CurrentImg: req.file.originalname } })
    return res.status(200).send(response)
}


static async GET_CART(req, res){
    try {
    let Token = req.body.Token || '';
    let User = await Usuarios.findOne({Token: Token });

    let Carrito = User.Carrito || [];



    res.status(200).send(Carrito)
        
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async GET_CERRITO_SESSION(req, res){
    console.log('hola')
    try {
        console.log('hola')
        let Token = req.body.Token || '';
        let User = await Usuarios.findOne({Token: Token });
    
        if(User){
            return res.status(200).json(User.Carrito)
        }else{
            return res.status(200).json([])
        }
        
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async ADD_TO_CART(req, res){
    try {
        let Token = req.body.Token;
        let User = await Usuarios.findOne({Token: Token });
        let Carrito = User.Carrito;

        console.log(Carrito);


        let { CodigoImportadora, Cantidad, Modelo } = req.body;

        if(Modelo == 'No Informado'){
            let Product = await Productos.findOne({$or: [{ CodigoImportadora: CodigoImportadora }, { CodigoProducto: CodigoImportadora }, { OEM: CodigoImportadora }]})
            if(Product){
                let Existe = false;
        
                if(Carrito.length > 0){
                    Carrito.map(e => {
                        if(e.CodigoImportadora == Product.CodigoImportadora){
                            e.Cantidad = parseInt(e.Cantidad) + parseInt(Cantidad)
                            e.Total = parseInt(e.Precio) * parseInt(e.Cantidad)
                            Existe = true
                        }
                    })
                }
        
                if(Existe){
                    await Usuarios.updateOne({Token: Token}, {$set: {Carrito: Carrito} });
                    return res.status(200).json(Carrito);
                }
        
                let Json = {
                    Importadora: Product.Importadora,
                    CodigoProducto: Product.CodigoProducto,
                    CodigoImportadora: Product.CodigoImportadora,
                    Descripcion: Product.Descripcion,
                    Marca: Product.Marca,
                    Origen: Product.Origen,
                    Cantidad: Cantidad,
                    OEM: Product.OEM,
                    CurrentImg: Product.CurrentImg,
                    Modelo: Modelo,
                    Img: Product.Img,
                    Retiro: Product.Retiro,
                    Precio: MargenPrecio(Product.PrecioImportadora),
                    Total: MargenPrecio(Product.PrecioImportadora) * req.body.Cantidad
                }
        
                Carrito.push(Json)
                
                await Usuarios.updateOne({Token: Token}, {$set: {Carrito: Carrito} });

                return res.status(200).json(Carrito)
            }else{
                return res.status(200).send('PRODUCTO NO ENCONTRADO CODIGO: ' + CodigoImportadora)
            }
        }

        let Product = await Productos.findOne({ CodigoImportadora: CodigoImportadora })
        
        let Existe = false;

        Carrito.map(e => {
            if(e.CodigoImportadora == Product.CodigoImportadora){
                e.Cantidad = parseInt(e.Cantidad) + parseInt(Cantidad)
                e.Total = parseInt(e.Precio) * parseInt(e.Cantidad)
                Existe = true
            }
        })

        if(Existe){
            await Usuarios.updateOne({Token: Token}, {$set: {Carrito: Carrito} });
            return res.status(200).json(Carrito);
        }

        let Json = {
            Importadora: Product.Importadora,
            CodigoProducto: Product.CodigoProducto,
            CodigoImportadora: Product.CodigoImportadora,
            Descripcion: Product.Descripcion,
            Marca: Product.Marca,
            Origen: Product.Origen,
            Cantidad: Cantidad,
            OEM: Product.OEM,
            CurrentImg: Product.CurrentImg,
            Modelo: Modelo,
            Img: Product.Img,
            Retiro: Product.Retiro,
            Precio: MargenPrecio(Product.PrecioImportadora),
            Total: MargenPrecio(Product.PrecioImportadora) * req.body.Cantidad
        }

        Carrito.push(Json)

        await Usuarios.updateOne({Token: Token}, {$set: {Carrito: Carrito} });
        return res.status(200).json(Carrito)
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async REMOVE_TO_CART(req, res){
    try {
        let Token = req.body.Token;
        let User = await Usuarios.findOne({Token: Token });
        let Carrito = User.Carrito;

        let { CodigoImportadora, Cantidad } = req.body;
        if(CodigoImportadora == 'todo'){
            Carrito = []
            await Usuarios.updateOne({Token: Token}, {$set: {Carrito: Carrito} });
            return res.status(200).send('EXITO')
        }
        let Product = await Productos.findOne({ CodigoImportadora: CodigoImportadora })
        Carrito.map(e => {
            if(e.CodigoImportadora == Product.CodigoImportadora){
                if(e.Cantidad - 1 == 0 || Cantidad == 99){
                    Carrito.forEach(function(currentValue, index, arr){
                        if(Carrito[index].CodigoImportadora == e.CodigoImportadora){
                            Carrito.splice(index, 1);     
                         }
                        })

                }else{
                    e.Cantidad = parseInt(e.Cantidad) - parseInt(Cantidad)
                    e.Total = parseInt(e.Precio) * parseInt(e.Cantidad)
                }
            }
        })
        await Usuarios.updateOne({Token: Token}, {$set: {Carrito: Carrito} });
        return res.status(200).json(Carrito);

    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async UPDATE_CART(req, res){
    try {
        let Token = req.body.Token;
        let User = await Usuarios.findOne({Token: Token });
        let Carrito = User.Carrito;

        let { CodigoImportadora, Cantidad } = req.body;
        let Product = await Productos.findOne({ CodigoImportadora: CodigoImportadora })
        Carrito.map(e => {
            if(e.CodigoImportadora == Product.CodigoImportadora){
                    e.Cantidad = parseInt(Cantidad)
                    e.Total = parseInt(e.Precio) * parseInt(e.Cantidad)
            }
        })

        await Usuarios.updateOne({Token: Token}, {$set: {Carrito: Carrito} });
        return res.status(200).json(Carrito);

    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async DELETE_SESSION(req, res){
       let { Token } = req.body;
       await Usuarios.updateOne({Token: Token}, {$set: {Carrito: []} });
       res.send('session destruida')
}


//ORDEN


// this.Orden = await API.POST_ORDEN(this.Token);

static async POST_ORDEN(req, res){
    try {
        let { Token } = req.body;

        var Datos = await Ordenes.aggregate([
            {
              $lookup: {
                from: "ventas", // nombre de la base de datos a hacer innerjoin
                localField: "TBK_TOKEN", // campos relacionados de productos
                foreignField: "TBK_TOKEN", // campos relacionados de productos sasval
                as: "Productos" // como se llamara el dato agregado
              }
            },
            { $match: { TBK_TOKEN: Token } }
          ]);

          res.status(200).json(Datos)

    } catch (error) {
        res.status(200).json(error)
    }
}


static async POST_SAVEORDEN(req, res){
    try {
        
        let { Json } = req.body;
        
        var respuesta = await Folios.findOne( { Referencia: 'Webpay' })
        
        req.session.Orden = respuesta.Orden;
        
        Json = { ...Json, Orden: respuesta.Orden }

        await new Ordenes(Json).save();

        var Cliente = await Clientes.findOne({ Rut: Json.Rut })

        if(Cliente){
            var Compras = [ ...Cliente.Compras,  respuesta.Orden ];
            await Clientes.updateOne({ Rut: Json.Rut }, { Compras })
        }else{
            var Compras = [ respuesta.Orden ];
            Json = { ...Json, Compras: Compras }
            await new Clientes(Json).save();
        }
        res.status(200).json('saved');
    } catch (error) {
        res.status(200).json(error)
    }
}


//WEBPAY API

static async POST_WEBPAY(req, res){

    let Token = req.body.Token;
    let User = await Usuarios.findOne({Token: Token });
    let Carrito = User.Carrito;

    let Total = 0;

    Carrito.map(e => {
        Total = Total + e.Total
    })

    var respuesta = await Folios.findOne( { Referencia: 'Webpay' });

    // Comenzando prueba de webapyplus
    
    const amount = Total;
    const sessionId = 'Session' + respuesta.Session;
    const buyOrder = respuesta.Orden;
    const returnUrl = 'http://localhost:8080/api/res-webpay'
    const finalUrl = 'http://localhost:8080/api/res-webpay'

    const response = await WebpayPlus.Transaction.create(buyOrder, sessionId, amount, returnUrl);

    Carrito.map(async e => {
        await new Ventas({ ...e, TBK_TOKEN: response.token, Orden: parseInt(respuesta.Orden), TotalNeto: Total }).save(); 
    })

    await Ordenes.updateOne({ Orden: respuesta.Orden }, {$set: { TBK_TOKEN: response.token, Orden: parseInt(respuesta.Orden), TotalNeto: Total } })

    await Folios.updateOne( { Referencia: 'Webpay' }, {$set: { Orden: (respuesta.Orden + 1) } });

    Carrito = [];

    await Usuarios.updateOne({Token: Token}, {$set: {Carrito: []} });
    return res.status(200).json({ response })

}

static async POST_WEBPAY_RETURN(req, res){
try {

    //TEST 4051885600446623

    var { token_ws } = req.body;

    const response = await WebpayPlus.Transaction.commit(token_ws);

    //Proximamente actulizar los Stock en productos y en ventas por cada producto
    // vendidos actualizar ordenes de compras que son las ventas y stock de productos

    await Ventas.updateMany({ TBK_TOKEN: token_ws }, { $set: { ...response } } )

    await Ordenes.updateOne({ TBK_TOKEN: token_ws }, { $set: { ...response } } )

    return res.redirect('/compra/' + token_ws)

}catch (err) {

    var { TBK_TOKEN, TBK_ORDEN_COMPRA, TBK_ID_SESION } = req.body;

    await Ventas.updateMany({ TBK_TOKEN }, {$set: { status: 'ABORTED' }})

    await Ordenes.updateOne({ TBK_TOKEN }, {$set: { status: 'ABORTED' }})

    return res.redirect('/compra/' + TBK_TOKEN )
}

}


// Retry pago Webpay Plus 
static async POST_RETRY_WEBPAY(req, res){

    var { Json } = req.body;

    const amount = Json.Total;
    const sessionId = 'Session' + Json.Session;
    const buyOrder = Json.Orden;
    const returnUrl = 'http://localhost:8080/api/res-webpay'
    const finalUrl = 'http://localhost:8080/api/res-webpay'

    const response = await WebpayPlus.Transaction.create(buyOrder, sessionId, amount, returnUrl);

    //Actualizar la venta

    await Ventas.updateOne({TBK_TOKEN: Json.TBK_TOKEN }, {$set: { TBK_TOKEN: response.token } })

    await Ordenes.updateOne({ TBK_TOKEN: Json.TBK_TOKEN }, {$set: { TBK_TOKEN: response.token, Dia: Json.Dia, FechaEntrega: Json.FechaEntrega, FechaEntregaDate: Json.FechaEntregaDate } })

    return res.status(200).json({ response })

}


//REGIONES

static async GET_REGIONES(req, res){
    try {

        let RegionesList = await Regiones.find()
        res.status(200).json(RegionesList)
        

    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async POST_COMUNA(req, res){
    try {

        let { Region } = req.body;

        let Comunas = await Regiones.findOne({ Region: Region })
        
        res.status(200).json(Comunas)


    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


// Validar ruts API LIBREDTE

static async POST_RUTEMPRESA(req, res){
    try {

        let { Rut } = req.body;

        var Empresa = await Empresas.findOne({ rut: Rut.slice(0, -2) })

        if(Empresa){
            return res.status(200).send(Empresa)
        }

        const options = {
            method: 'GET',
            url: `https://libredte.cl/api/dte/contribuyentes/info/${Rut}`,
            headers: {
              authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
              accept: 'application/json',
              'Content-Type': 'application/json'
            }
        }
          request(options, async (error, response, body) => {
            let Respuesta = JSON.parse(body)
            if(Respuesta.actividad_economica){
                await new Empresas(JSON.parse(body)).save()
                res.status(200).send(JSON.parse(body))
            }else{
                res.status(200).send('Invalido')
            }
          })


    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

//MARGEN PRECIO
static async PRECIOMERCADO(req, res){
    try {
        var { Importadora, CodigoImportadora } = req.body;
        PrecioMercado(Importadora, CodigoImportadora, res)

    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}



//FACTURACION

static async POST_EMITIR_DOCUMENTO(req, res){
    try {

       var { Documento } = req.body;

       if(Documento.TipoDocumento == 'Boleta'){
        GenerarBoleta(res, Documento)
       }else if(Documento.TipoDocumento == 'Factura'){
        GenerarFactura(res, Documento)
       }else if(Documento.TipoDocumento == 'Guía Despacho'){

       }else if(Documento.TipoDocumento == 'Abono'){
        console.log(Documento);
        var Detalles = [];

        for (let i = 0; i < Documento.Carrito.length; i++) {
    
            const init = {
            NroLinDet: parseInt(i) + 1,
            CdgItem: {
              TpoCodigo: 'Interna',
              VlrCodigo: Documento.Carrito[i].CodigoProducto
            },
            NmbItem: Documento.Carrito[i].Descripcion,
            QtyItem: parseInt(Documento.Carrito[i].Cantidad),
            PrcItem: parseInt(Documento.Carrito[i].Precio),
            MontoItem: parseInt(Documento.Carrito[i].Total.replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', ''))
          }
    
          Detalles.push(init)
        }

        console.log(Detalles, 'detalles')

        let Json = {
            ...Documento,
            Receptor: Documento.Rut.split('-')[0].replace('.', '').replace('.', '').replace('.', '').replace('.', '').replace('.', ''),
            Dte: 0,
            Codigo: 'Abono',
            Detalles,
            Temporal: false
        }


        let Abono = await new Abonos(Json).save();
        console.log(Abono)
        res.status(200).send(Abono)
       }else if(Documento.TipoDocumento == 'Cotización'){
        GenerarCotizacion(res, Documento)
       }else if(Documento.TipoDocumento == 'Orden de Compra'){

       }else{
           res.status(200).send('No se encontro el tipo de Documento solicitado.')
       }
        


    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


// GET_DOCUMENTOS
static async GET_DOCUMENTOS(req, res){
    try {
        let today = new Date();
        today.setHours(0,0,0,0);
        let tomorrow = new Date(today)
        tomorrow.setDate(tomorrow.getDate() + 1)

        let DocBoletas = await Boletas.find({ $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]})

        let DocFacturas = await Facturas.find({ $and: [
            { Temporal: false},
            {createdAt: {$gte: new Date(today)}},
            {createdAt: {$lte: new Date(tomorrow)}}
        ]})

        
        let DocAbonos = await Abonos.find({ $and: [
            { Temporal: false},
            {createdAt: {$gte: new Date(today)}},
            {createdAt: {$lte: new Date(tomorrow)}}
        ]})

        let DocNotaCreditos = await NotaCreditos.find({ $and: [
            { Temporal: false},
            {createdAt: {$gte: new Date(today)}},
            {createdAt: {$lte: new Date(tomorrow)}}
        ]})

        let mes = '';
        let dia = '';

        if(parseInt(new Date().getMonth()) + 1 < 10){ mes = '0' + (parseInt(new Date().getMonth()) + 1) }else{ mes = (parseInt(new Date().getMonth()) + 1) }
        
        if(parseInt(new Date().getDate()) < 10){  dia = '0' + (parseInt(new Date().getDate())) }else{ dia = (parseInt(new Date().getDate())) }

        let FechaFormat = new Date().getFullYear() + '-' + mes + '-' + dia


        var options = {
            'method': 'POST',
            'url': 'https://libredte.cl/api/dte/dte_emitidos/buscar/77177455',
            'headers': {
              'authorization': 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
              'accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "receptor": null,
              "razon_social": null,
              "dte": null,
              "folio": null,
              "fecha": null,
              "total": null,
              "usuario": null,
              "fecha_desde": FechaFormat,
              "fecha_hasta": FechaFormat,
              "total_desde": null,
              "total_hasta": null,
              "sucursal_sii": null,
              "periodo": null,
              "receptor_evento": null,
              "cedido": null,
              "xml": {
                "Detalle/NmbItem": null
              }
            })
          
          };
          request(options, async function (error, response) {
            if (error) throw new Error(error);
            let Json = response.body.replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "");
            let data = JSON.parse(Json)
            let VendeB = await Boletas.distinct("Usuario", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )
            
            let VendeF = await Facturas.distinct("Usuario", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let VendeA = await Abonos.distinct("Usuario", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let VendeNC = await NotaCreditos.distinct("Usuario", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let result = [
                ...VendeB,
                ...VendeF,
                ...VendeA,
                ...VendeNC
            ];

            let Vendedores = result.filter((item,index)=>{
                return result.indexOf(item) === index;
            })

            // Metodos de pago y cuentas bancarias 
            let BancoB = await Boletas.distinct("CuentaBancariaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )
            
            let BancoF = await Facturas.distinct("CuentaBancariaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let BancoA = await Abonos.distinct("CajaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let CajaB = await Boletas.distinct("CajaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )
            
            let CajaF = await Facturas.distinct("CajaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let CajaA = await Abonos.distinct("CajaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let MetodoF = await Facturas.distinct("MetodoPagoSeleccionado", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )
            
            let MetodoB = await Boletas.distinct("MetodoPagoSeleccionado", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            
            let MetodoA = await Abonos.distinct("MetodoPagoSeleccionado", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )


            let resultDos = [
                ...BancoB,
                ...BancoF,
                ...BancoA,
                ...CajaB,
                ...CajaF,
                ...CajaA,
                ...MetodoB,
                ...MetodoF,
                ...MetodoA
            ];

            console.log(resultDos)

            let MetodosPago = resultDos.filter((item,index)=>{
                item = item == 'Transbank y Efectivo' ? 'Transbank' : item;
                item = item == 'Transbank y Transferencia' ? 'Transbank' : item;

                if(item != undefined && item != null && item != '' && item != 'Transferencia' && item != 'Efectivo' && item !=  "Transferencia y Efectivo"){
                    return resultDos.indexOf(item) === index;
                }
            });

            res.status(200).json({data, DocAbonos, DocBoletas, DocFacturas, DocNotaCreditos, Vendedores, MetodosPago})
            
        });



    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async POST_DOCUMENTO(req, res){
    let { Documento } = req.body;

    let options = { method: 'GET',
    url: 'https://libredte.cl/api/dte/dte_emitidos/info/' + Documento.dte + '/' + Documento.folio + '/77177455',
    qs: 
     { getXML: '0',
       getDetalle: '1',
       getDatosDte: '1',
       getTed: '0',
       getResolucion: '0',
       getEmailEnviados: '0',
       getLinks: '0',
       getReceptor: '1',
       getSucursal: '0',
       getUsuario: '0' },
    headers: 
     { authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==' } };
  
  request(options, function (error, response, body) {
    if(error){ res.status(200).json(error)};
        let Json = response.body.replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "");
        let data = JSON.parse(Json)
        return res.status(200).json(data)
  });


}


static async POST_DOCUMENTOS(req, res){
    try {
        let { dateFilter } = req.body;
        console.log(dateFilter[0], 'today')
        let today = new Date(dateFilter[0]+'T00:00:00.000Z');
        let tomorrow = new Date(dateFilter[1]+'T00:00:00.000Z')
        tomorrow.setDate(tomorrow.getDate() + 1)


        console.log(today, tomorrow, 'datos')

        let DocBoletas = await Boletas.find({ $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]})

        let DocFacturas = await Facturas.find({ $and: [
            { Temporal: false},
            {createdAt: {$gte: new Date(today)}},
            {createdAt: {$lte: new Date(tomorrow)}}
        ]})

        let DocAbonos = await Abonos.find({ $and: [
            { Temporal: false},
            {createdAt: {$gte: new Date(today)}},
            {createdAt: {$lte: new Date(tomorrow)}}
        ]})
        
        let DocNotaCreditos = await NotaCreditos.find({ $and: [
            { Temporal: false},
            {createdAt: {$gte: new Date(today)}},
            {createdAt: {$lte: new Date(tomorrow)}}
        ]})


        var options = {
            'method': 'POST',
            'url': 'https://libredte.cl/api/dte/dte_emitidos/buscar/77177455',
            'headers': {
              'authorization': 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
              'accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "receptor": null,
              "razon_social": null,
              "dte": null,
              "folio": null,
              "fecha": null,
              "total": null,
              "usuario": null,
              "fecha_desde": dateFilter[0],
              "fecha_hasta": dateFilter[1],
              "total_desde": null,
              "total_hasta": null,
              "sucursal_sii": null,
              "periodo": null,
              "receptor_evento": null,
              "cedido": null,
              "xml": {
                "Detalle/NmbItem": null
              }
            })
          
          };
         
          request(options, async function (error, response) {
            if (error) throw new Error(error);
            let Json = response.body.replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "").replace(/(\r\n|\n|\r)/gm, "");
            let data = JSON.parse(Json)
            let VendeB = await Boletas.distinct("Usuario", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )
            
            let VendeF = await Facturas.distinct("Usuario", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let VendeA = await Abonos.distinct("Usuario", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let VendeNC = await NotaCreditos.distinct("Usuario", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let result = [
                ...VendeB,
                ...VendeF,
                ...VendeA,
                ...VendeNC
            ];

            let Vendedores = result.filter((item,index)=>{
                return result.indexOf(item) === index;
            })

            // Metodos de pago y cuentas bancarias 
            let BancoB = await Boletas.distinct("CuentaBancariaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )
            
            let BancoF = await Facturas.distinct("CuentaBancariaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let BancoA = await Abonos.distinct("CajaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let CajaB = await Boletas.distinct("CajaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )
            
            let CajaF = await Facturas.distinct("CajaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let CajaA = await Abonos.distinct("CajaSeleccionada", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            let MetodoF = await Facturas.distinct("MetodoPagoSeleccionado", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )
            
            let MetodoB = await Boletas.distinct("MetodoPagoSeleccionado", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )

            
            let MetodoA = await Abonos.distinct("MetodoPagoSeleccionado", { $and: [
                { Temporal: false},
                {createdAt: {$gte: new Date(today)}},
                {createdAt: {$lte: new Date(tomorrow)}}
            ]} )


            let resultDos = [
                ...BancoB,
                ...BancoF,
                ...BancoA,
                ...CajaB,
                ...CajaF,
                ...CajaA,
                ...MetodoB,
                ...MetodoF,
                ...MetodoA
            ];

            console.log(resultDos)

            let MetodosPago = resultDos.filter((item,index)=>{
                item = item == 'Transbank y Efectivo' ? 'Transbank' : item;
                item = item == 'Transbank y Transferencia' ? 'Transbank' : item;

                if(item != undefined && item != null && item != '' && item != 'Transferencia' && item != 'Efectivo' && item !=  "Transferencia y Efectivo"){
                    return resultDos.indexOf(item) === index;
                }
            });

            res.status(200).json({data, DocAbonos, DocBoletas, DocFacturas, DocNotaCreditos, Vendedores, MetodosPago})
            
        });



    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


//NOTA DE CREDITO
  static async POST_NOTACREDITO(req, res){
    try {
        let { Documento } = req.body;


        if( Documento.detalle[0].NetoItem){
            Documento.detalle.map(e => {
                e.PrcItem = (Math.round(parseInt(e.PrcItem) / 1.19)).toString();
                e.MontoItem = (e.PrcItem * parseInt(e.QtyItem)).toString();
                delete e.NetoItem;
                delete e.IvaItem;
            })
        }

        console.log(Documento.detalle)

        const options = {
            method: 'POST',
            url: 'https://libredte.cl/api/dte/documentos/emitir?normalizar=1&formato=json&links=0&email=0',
            headers: {
              authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
              accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: {
              Encabezado: {
                IdDoc: {
                  "TipoDTE": "61",
                  "IndServicio": "3"
                },
                Emisor: {
                  "RUTEmisor": "77177455-5",
                  "RznSoc": "Chile Repuestos",
                  "GiroEmis": "Fabricaci\u00f3n de partes, piezas y accesorios para veh\u00edculos automotores",
                  "Telefono": "+56 9 41054479",
                  "CorreoEmisor": "ventas.chilerepuestos@gmail.com",
                  "Acteco": "293000",
                  "DirOrigen": "Av. Ejercito Libertador 62",
                  "CmnaOrigen": "Santiago",
                  "CdgVendedor": "ventas.chilerepuestos@gmail.com"
                },
                Receptor: {
                  "RUTRecep": Documento.receptor.rut ? Documento.receptor.rut  + '-' + Documento.receptor.dv : 'SIN RUT',
                  "RznSocRecep": Documento.receptor.razon_social ? Documento.receptor.razon_social : 'SIN RAZON SOCIAL',
                  "GiroRecep": Documento.receptor.giro ? Documento.receptor.giro : 'SIN GIRO',
                  "DirRecep": Documento.receptor.direccion ? Documento.receptor.direccion : 'SIN DIRECCION',
                  "CmnaRecep": Documento.receptor.comuna ? Documento.receptor.comuna : 'SIN COMUNA',
                  "CiudadRecep": false
                }
              },
              "Detalle": Documento.detalle,
              "SubTotInfo": false,
              "DscRcgGlobal": false,
              "Referencia": [
                {
                    "NroLinRef": 1,
                    "TpoDocRef": Documento.dte,
                    "IndGlobal": false,
                    "FolioRef": Documento.folio,
                    "RUTOtr": false,
                    "FchRef": Documento.fecha,
                    "CodRef": Documento.CodeNotaCredito,
                    "RazonRef": Documento.RazonNotaCredito
                }
            ]
            },
            json: true
        
          };
        //   return res.send(options)
          request(options, async function (error, response, body) {
            if (error){ return res.status(200).json(error)};
            
            if(typeof(body) === 'string'){
                return res.status(200).send(body)
            }


            let Json;
            let RegistroId;
            
            if(Documento.dte == 33){
                RegistroId = await Facturas.findOne({ Folio: Documento.folio });
                
                Json = {
                    ...Documento,
                    Receptor: body.receptor,
                    Dte: body.dte,
                    Codigo: body.codigo,
                    Temporal: true,
                    // Editar
                    Detalles: Documento.detalle,
                    Factura: RegistroId._id
                }

            }else{
                RegistroId = await Boletas.findOne({ Folio: Documento.folio });
                Json = {
                    ...Documento,
                    Receptor: body.receptor,
                    Dte: body.dte,
                    Codigo: body.codigo,
                    Temporal: true,
                    // Editar
                    Detalles: Documento.detalle,
                    Boleta: RegistroId._id
                }

            }

            console.log(body, 'body')

            console.log('pasamos a crear');
            
            let Document = await new NotaCreditos(Json).save();
            
            console.log(RegistroId.NotaCreditoRef)

            let NotaCreditoRef = [
                ...RegistroId.NotaCreditoRef,
                Document._id
            ]

            if(Documento.dte == 33){
                await Facturas.updateOne({ _id: RegistroId._id }, {$set: { NotaCreditoRef: NotaCreditoRef }})
            }else{
                await Boletas.updateOne({ _id: RegistroId._id }, {$set: { NotaCreditoRef: NotaCreditoRef }})
            }


            console.log('Creada la nota de credito vamos a hacerla real');

        //Comenzar a emitir el DTE Real

        let options2 = {
            method: 'POST',
            url: 'https://libredte.cl/api/dte/documentos/generar?getXML=0&links=0&email=0&retry=10&gzip=0',
            headers: {
              authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
              accept: 'application/json',
              'Content-type': 'application/pdf'
            },
            body: {
              emisor: 77177455,
              receptor: body.receptor,
              dte: body.dte,
              codigo: body.codigo
            },
            json: true
          }
          console.log(options2, 'options2')
          request(options2, async function (error, response, body) {
            if (!error && response.statusCode == 200) {
                //Cambiar la compro a real
            console.log('Se creo la nota de credito');
                console.log(Document._id);
                await NotaCreditos.updateOne({ _id: Document._id }, {$set: { Temporal: false, Folio: body.folio }})

                
            console.log('neuvos registros');
                let Producto;
                for (let i = 0; i < Documento.detalle.length; i++) {

                    Producto = await Productos.findOne({ $or: [ { CodigoImportadora: Documento.detalle[i].CdgItem.VlrCodigo }, { CodigoProducto: Documento.detalle[i].CdgItem.VlrCodigo } ] } )

                    new Registros({
                        Folio: body.folio,
                        rut: Documento.receptor.rut,
                        dv: Documento.receptor.dv,
                        razon_social: Documento.receptor.razon_social,
                        giro: Documento.receptor.giro,
                        CodigoImportadora: Producto.CodigoImportadora,
                        Descripcion: Documento.detalle[i].NmbItem,
                        Cantidad: Documento.detalle[i].QtyItem,
                        CantidadRestante: Documento.detalle[i].QtyItem,
                        CantidadTotal: Producto.Bodega + parseInt(Documento.detalle[i].QtyItem),
                        PrecioImportadora: RegistroId.PrecioImportadora,
                        Usuario: Documento.datos_dte.Encabezado.Emisor.CdgVendedor,
                        Salida: false,
                        Entrada: true,
                        Devolucion: true,
                        Observaciones: Documento.RazonNotaCredito,
                        Registro: RegistroId._id,
                        Boleta: Documento.dte == 39? RegistroId._id : null,
                        Factura: Documento.dte == 33? RegistroId._id : null
                    }).save();

                    AumentarStock(
                        Documento.datos_dte.Encabezado.Emisor.CdgVendedor || 'DESCONOCIDO',
                        Documento.detalle[i].NmbItem,
                        'Devolución',
                        Producto.CodigoImportadora,
                        Documento.detalle[i].QtyItem,
                        RegistroId._id ? RegistroId._id : 'No Registrado',
                        'No Editar Ubicacion',
                        0,
                        Producto)
    
                }
                console.log('Se aumento del stock');


                return res.status(200).json({ response: 'EXITO', body });
            }else{
                await Boletas.deleteMany({Temporal: true})
                return res.status(200).send(error)
            }
          })

        // end

        });



    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

//Proovedores

static async GET_PROVEEDORES(req, res){
    try {
        let Response = await Proveedores.find();
        return res.status(200).json(Response);
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async GET_PROVEEDOR(req, res){
    try {
        let Response = await Proveedores.findOne({_id: req.params.id});
        return res.status(200).json(Response);
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async CREAR_PROVEEDOR(req, res){
    try {
        console.log(req.body, 'aqui');
        let Comp = await Proveedores.findOne({rut: req.body.Rut});

        if(Comp){
            return res.status(200).send('ERROR: YA EXISTE UN PROVEEDOR ASOCIADO AL RUT ' + req.body.Rut) 
        }else{
            const options = {
                method: 'GET',
                url: `https://libredte.cl/api/dte/contribuyentes/info/${req.body.Rut}`,
                headers: {
                  authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
                  accept: 'application/json',
                  'Content-Type': 'application/json'
                }
            }
              request(options, async (error, response, body) => {
                let Respuesta = JSON.parse(body)
                if(Respuesta.actividad_economica){
                    let Json = {
                        iva: req.body.iva,
                        ...JSON.parse(body)
                    }
                    await new Proveedores(Json).save()
                    return res.status(200).send('EXITO');
                }else{
                    res.status(200).send('ERROR EL RUT NO PERTENECE A UNA EMPRESA')
                }
              })
        }

    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async UPDATE_PROVEEDOR(req, res){
    try {
        console.log(req.body)
        await Proveedores.updateOne({rut: req.body.rut }, {$set: req.body });        
        return res.status(200).json('EXITO');
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async ELIMINAR_PROVEEDOR(req, res){
    try {
        let Verificar = await Registros.findOne({ rut: req.params.rut })
        if(Verificar){
            return res.status(200).send('ERROR: NO PUEDES ELIMINAR UN PROVEEDOR CON HITORIAL DE COMPRA.');
        }else{
            let Response = await Proveedores.deleteOne({ rut: req.params.rut});
            return res.status(200).send('EXITO');
        }
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}



// Bodegas

static async GET_BODEGAS(req, res){
    try {
        let Response = await Bodegas.find();
        return res.status(200).json(Response);
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async GET_BODEGA(req, res){
    try {
        let Response = await Bodegas.findOne({_id: req.params.id});
        return res.status(200).json(Response);
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}
static async UPDATE_BODEGA(req, res){
    try {
        console.log(req.body)
        await Bodegas.updateOne({Bodega: req.body.Bodega }, {$set: req.body });        
        return res.status(200).json('EXITO');
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async CREAR_BODEGA(req, res){
    try {
        console.log(req.body);
        let Comp = await Bodegas.findOne({Bodega: req.body.Bodega});

        if(Comp){
            return res.status(200).send('Error: Ya existe la bodega ' + req.body.Bodega) 
        }else{
            new Bodegas(req.body).save()
            return res.status(200).send('EXITO');
        }

    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async ELIMINAR_BODEGA(req, res){
    try {
        let Verificar = await Productos.findOne({ Bodegas: req.params.Bodega })
        if(Verificar){
            return res.status(200).send('ERROR: EXISTEN PRODUCTOS EN LA BODEGA SELECCIONADA.');
        }else{
            let Response = await Bodegas.deleteOne({ Bodega: req.params.Bodega});
            return res.status(200).send('EXITO');
        }
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}



// WMS

static async GET_REGISTROS(req, res){
    try {
          
        await Registros.
        find().
        lean().
        populate({ path: 'Producto', model: Productos}).
        populate({ path: 'Boleta', model: Boletas }).
        populate({ path: 'Factura', model: Facturas }).
        populate({ path: 'Registro', model: Registros }).
        sort({_id: -1}).
        exec(async function (err, registros) {
            res.status(200).send(registros)
        });
    } catch (err) {
        res.status(200).json({ message: err.message});
    }
}

static async GET_REGISTRO(req, res){
    try {
        let Response = await Registros.findOne({_id: req.params.id});
        return res.status(200).json(Response);
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async UPDATE_REGISTRO(req, res){
    try {
        //POR MODIFICAR
        let { CodigoImportadora, IdRegistro, Descripcion, Ubicacion, Cantidad, CantidadAnterior, PrecioImportadora, Usuario } = req.body;
        
        if(Cantidad < 1 || PrecioImportadora < 1){
            return res.status(200).send('ERROR EN LA CANTIDAD O PRECIO');
        }

        let Producto = await Productos.findOne({ $or: [ { CodigoImportadora: CodigoImportadora }, { CodigoProducto: CodigoImportadora } ] } )

        if(CantidadAnterior == Cantidad){
            await Registros.updateOne({_id: IdRegistro}, {$set: { PrecioImportadora: PrecioImportadora, Descripcion: Descripcion } })
            await Productos.updateMany({CodigoImportadora: CodigoImportadora}, {$set: { Ubicacion: Ubicacion, Descripcion: Descripcion } })
        }else if(CantidadAnterior < Cantidad){
            let Diferencia = (Cantidad - CantidadAnterior)
            AumentarStock(Usuario, Descripcion, 'Sumar', CodigoImportadora, Diferencia, IdRegistro, Ubicacion, PrecioImportadora, Producto)
        }else if(CantidadAnterior > Cantidad){
            let Diferencia = (CantidadAnterior - Cantidad)
            DisminuirStock(Usuario, Descripcion, 'Restar', CodigoImportadora, Diferencia, IdRegistro, Ubicacion, PrecioImportadora, Producto)
        }else{
            return res.status(200).send('CANTIDAD ERROR')
        }

        return res.status(200).json('EXITO');
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async CREAR_REGISTRO(req, res){
    try {
        console.log(req.body);

        let { Observaciones, Folio, rut, dv, razon_social, iva, giro, ProductosRegistrados, PrecioTotal, Usuario } = req.body;
        
        let Producto;
        
        for(let i = 0; i < ProductosRegistrados.length; i++){
            if(ProductosRegistrados[i].CodigoImportadora == ''){
                // No hacer nada...
            }else{
            Producto = await Productos.findOne({CodigoImportadora: ProductosRegistrados[i].CodigoImportadora})
                new Registros({
                    Observaciones,
                    Folio,
                    rut,
                    dv,
                    razon_social,
                    giro,
                    PrecioTotal: Math.round(PrecioTotal),
                    Usuario,
                    iva,
                    CodigoImportadora: ProductosRegistrados[i].CodigoImportadora,
                    Descripcion: ProductosRegistrados[i].Descripcion,
                    Cantidad: ProductosRegistrados[i].Cantidad,
                    CantidadRestante: ProductosRegistrados[i].Cantidad,
                    PrecioImportadora: ProductosRegistrados[i].PrecioImportadora,
                    Salida: false,
                    Entrada: true,
                    Reajuste: [],
                    ReajusteUsuario: [],
                    ReajusteMotivo: [],
                    CantidadTotal: Producto.Bodega + ProductosRegistrados[i].Cantidad
                }).save()
                
                let JsonProducto = {
                    Bodega: (Producto.Bodega + ProductosRegistrados[i].Cantidad)
                }
    
                await Productos.updateMany({ CodigoImportadora: ProductosRegistrados[i].CodigoImportadora }, {$set: JsonProducto })
            }

        }

        return res.status(200).json('EXITO');
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async ELIMINAR_REGISTRO(req, res){
    try {
        let Verificar = await Registros.findOne({ _id: req.params.Id })
        if(Verificar.Cantidad == Verificar.CantidadRestante){
            return res.status(200).send('ERROR: EXISTEN PRODUCTOS EN LA BODEGA SELECCIONADA.');
        }else{
            let Response = await Bodegas.deleteOne({ Bodega: req.params.Bodega});
            return res.status(200).send('EXITO');
        }
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


// SUCURSAL

static async GET_SUCURSALES(req, res){
    try {
        let Response = await Sucursales.find();
        return res.status(200).json(Response);
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async GET_SUCURSAL(req, res){
    try {
        let Response = await Sucursales.findOne({ _id: req.params.id });
        return res.status(200).json(Response);
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async UPDATE_SUCURSAL(req, res){
    try {
        await Sucursales.updateOne({Codigo: req.body.Codigo}, {$set: req.body });        
        return res.status(200).json('EXITO');
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async CREAR_SUCURSAL(req, res){
    try {
        let comp = await Sucursales.findOne({Codigo: req.body.Codigo })

        if(comp){
            return res.status(200).send('ERROR: YA EXISTE EL CODIGO DE LA SUCURSAL')
        }else{
            new Sucursales(req.body).save();
            return res.status(200).json('EXITO');
        }
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async ELIMINAR_SUCURSAL(req, res){
   try {
       await Sucursales.deleteOne({_id: req.params.id });        
       return res.status(200).json('EXITO');
   } catch (err) {
       return res.status(200).json({ message: err.message});
   }
}


//PARA PRUEBAS

static async UPDATE_ALL_DOCUMENTS(req, res){
    try {
        await Abonos.updateMany({}, {$set: { createdAt: new Date("2022-06-03"), Temporal: false } })
        await Facturas.updateMany({}, {$set: { createdAt: new Date("2022-06-03"), Temporal: false } })
        await Boletas.updateMany({}, {$set: { createdAt: new Date("2022-06-03"), Temporal: false } })
        return res.status(200).json('ok');
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async EXPORT(req, res){
    await Productos.updateMany({}, {$set: { 
    Ubicacion: [{
        Bodega: null,
        Fila: null,
        Columna: null,
        Nivel: null,
        Filas: [],
        Columnas: [],
        Niveles: []
    }],
    Bodega: 0,
    Vendidos: 0
} })
    // await Productos.deleteMany({Legacy: true})
    // await Registros.deleteMany({Legacy: true})
    // StockOld.map(async (e, i) =>{
    //     let Comp = await Productos.findOne({CodigoImportadora: e.CodigoImportadora})
    //     console.log(i)
    //     if(Comp){
    //         await Productos.updateMany({CodigoImportadora: e.CodigoImportadora}, {$set: {Vendidos: e.Vendidos, Bodega: e.Bodega, Ubicacion: e.Ubicacion }});
    //         new Registros(e).save()
    //     }else{
    //         new Productos(e).save()
    //         new Registros(e).save()
    //     }
    // })

    res.send('Ready')

}

static async GET_TESTTRES(req, res){

    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Origin': 'https://www.cuatroruedas.cl',
        'Connection': 'keep-alive',
        'Referer': 'https://www.cuatroruedas.cl/sistema/',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-User': '?1',
        jar: jar
    };
    
    var dataString = '_method=POST&data%5BCliente%5D%5Brut_empresa%5D=77.177.455-5&data%5BCliente%5D%5Bclave%5D=ejercito62';
    
    var options = {
        url: 'https://www.cuatroruedas.cl/sistema/clientes/login',
        method: 'POST',
        headers: headers,
        gzip: true,
        body: dataString,
        jar: jar
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {

            var headersdos = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:102.0) Gecko/20100101 Firefox/102.0",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
            "Accept-Language": "es-CL,es;q=0.8,en-US;q=0.5,en;q=0.3",
            "Content-Type": "multipart/form-data; boundary=---------------------------285243982628837725834080908036",
            "Upgrade-Insecure-Requests": "1",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "same-origin",
            "Sec-Fetch-User": "?1",
                jar: jar
            };


            var dataStringdos = `-----------------------------285243982628837725834080908036\r\nContent-Disposition: form-data; name=\"_method\"\r\n\r\nPOST\r\n-----------------------------285243982628837725834080908036\r\nContent-Disposition: form-data; name=\"data[Producto][modelo_uso]\"\r\n\r\nCulata\r\n-----------------------------285243982628837725834080908036--\r\n`;            
            
            var optionsdos = {
                url: 'https://www.cuatroruedas.cl/sistema/productos/buscar_catalogo',
                method: 'POST',
                headers: headersdos,
                body: dataStringdos,
                jar: jar
            };
            
            function callback(error, response, body) {
                if (!error && response.statusCode == 200) {

                    const $ = cheerio.load(body);
                    
                    let prueba = $('div > div.content > table > tbody > tr:nth-child(4) > td > table > tbody > tr:nth-child(2) > td > table > tbody').html().replace('/sistema/img/', 'https://www.cuatroruedas.cl/sistema/img/')

                    const jsonTablesCuatroRuedas = HtmlTableToJson.parse('<table><thead><th>1</th><th>2</th><th>3</th><th>Sku</th><th>3</th><th>Descripcion</th><th>4</th><th>Stock</th><th>5</th><th>6</th><th>7</th><th>Precio</th><th>8</th></thead><tbody>'+prueba+'</tbody></table>');

                    jsonTablesCuatroRuedas.results[0] = jsonTablesCuatroRuedas.results[0].filter(e => {
                        if(e.Sku != '' && e.Descripcion != '' && e.Precio != ''){
                            delete e[1]
                            delete e[2]
                            delete e[3]
                            delete e[4]
                            delete e[5]
                            delete e[6]
                            delete e[7]
                            delete e[8]
                            delete e[14]
                            return e;
                        }
                    })


                    jsonTablesCuatroRuedas.results[0] = jsonTablesCuatroRuedas.results[0].filter(e => {
                        if(Object.keys(e).length != 0){
                            return e;
                        }
                    })


                    res.send(jsonTablesCuatroRuedas.results[0]);
                }
            }
            
            request(optionsdos, callback);




        }
    }
    
    request(options, callback);


}

static async GET_TESTDOS(req, res){

    var headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:97.0) Gecko/20100101 Firefox/97.0',
        'Accept': '*/*',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'X-Requested-With': 'XMLHttpRequest',
        'Origin': 'https://b2b.refaxchile.cl',
        'Connection': 'keep-alive',
        'Referer': 'https://b2b.refaxchile.cl/B2BRefax/buscadorA.jsp',
        'Cookie': 'JSESSIONID=auVnjigF7UN5OcohK21Ec1ZO.undefined; _ga=GA1.2.1548015612.1656703432; _gid=GA1.2.1867041014.1656703432; _gat_gtag_UA_121061915_1=1',
        'Sec-Fetch-Dest': 'empty',
        'Sec-Fetch-Mode': 'cors',
        'Sec-Fetch-Site': 'same-origin'
    };
    
    var dataString = 'html=1&busqueda=amortiguador+trasero+&usuariop=sasval13&cliente=C77554630';
    





    var options = {
        url: 'https://b2b.refaxchile.cl/B2BRefax/buscadorA',
        method: 'POST',
        headers: headers,
        gzip: true,
        body: dataString
    };
    
    function callback(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body);
            res.status(200).send(body)
        }
    }
    
    request(options, callback);


}

static async GET_TEST(req, res){
    try {

        let response = await Productos.find({ Importadora: 'Mannheim' })
        console.log(response.length)
        var a = 0;
        for(var i = 0; i < response.length; i++){
            if(i > 0){
                if(response[i].CodigoModelo != response[i - 1].CodigoModelo){
                    a = 0;
                }
            }
            var CodigoProducto = `M-${response[i].Modelo.slice(0, 3)}${response[i].CodigoModelo}-${a}`
            await Productos.updateOne({_id: response[i]._id}, {$set: { CodigoProducto: CodigoProducto } })
            console.log(CodigoProducto)
            var a = a + 1;
        }

        
        res.status(200).send(CodigoProducto)


    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

static async GET_IMAGENCODE(req, res){
    try {

        let response = await Productos.find({ Importadora: 'Refax' })
        console.log(response.length)
        var a = 0;
        for(var i = 0; i < response.length; i++){
            await Productos.updateOne({_id: response[i]._id}, {$set: { CurrentImg: response[i].CodigoImportadora } })
        }

        
        res.status(200).send('miau')


    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async GET_CLIENT(req, res){
    try {
        var Cliente = await Clientes.findOne({ Rut: req.params.Rut })
        console.log(Cliente)
        if(Cliente){
            res.status(200).send(Cliente)
        }else{
            //Buscar su informacion
            var request = require('request');
            var options = {
              'method': 'POST',
              'url': 'https://partidas.registrocivil.cl/api/validalinea/12500004-5/A030421550/' + req.params.Rut,
              'headers': {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({})
            
            };
            request(options, function (error, response) {
              if (error) throw new Error(error);
              var Datos = JSON.parse(response.body);
              
              console.log(Datos)
              if(Datos.codigo == '0'){
                  var Json = {
                    Rut: req.params.Rut,
                    Nombres: Datos.data.nombres,
                    Apellidos: Datos.data.apellidoPrimario + ' ' + Datos.data.apellidoSecundario,
                  }
    
                  new Clientes(Json).save();
                  res.status(200).send(Json);
              }else if(Datos.codigo){
                res.status(200).send('ERROR')
              }else{
                  res.status(200).send('API NACIMIENTO NO RESPONDE')
              }
            });
        }
    } catch (error) {
        res.status(200).send(error)
    }
}


static async STOCKSTRING(req, res){
    try {
        console.log('1')
        var headers = {
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
            'Connection': 'keep-alive',
            'Cookie': 'cookie_test=please_accept_for_session; osCsid=trful836e6t155p8et9bouban1; _ga=GA1.2.1309353061.1644500044; _gid=GA1.2.268232372.1649948602',
            'Sec-Fetch-Dest': 'document',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Site': 'none',
            'Sec-Fetch-User': '?1',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
            'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"Windows"',
            'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t'
        };
        
        var options = {
            url: 'https://www.takora.cl/autos/repuestos/advanced_search_result.php?keywords=CB-1628GP-100',
            headers: headers
        };
        
        function callback(error, response, body) {
            if (!error && response.statusCode == 200) {
                const $ = cheerio.load(body);
                var Json = {}
                Json.Precio = $('.Price_listing').text();
                var url = $('body > table:nth-child(5) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table:nth-child(4) > tbody > tr:nth-child(1) > td:nth-child(1) > a:nth-child(1)').attr('href') || $('body > table:nth-child(5) > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(5) > td > table:nth-child(5) > tbody > tr > td > a:nth-child(1)').attr('href')
                if(!url){
                    res.send(body)
                }
                console.log(url)
                var headers = {
                    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
                    'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
                    'Connection': 'keep-alive',
                    'Cookie': 'cookie_test=please_accept_for_session; osCsid=trful836e6t155p8et9bouban1; _ga=GA1.2.1309353061.1644500044; _gid=GA1.2.268232372.1649948602',
                    'Referer': 'https://www.takora.cl/autos/repuestos/advanced_search_result.php?keywords=CB-1628GP-100',
                    'Sec-Fetch-Dest': 'document',
                    'Sec-Fetch-Mode': 'navigate',
                    'Sec-Fetch-Site': 'same-origin',
                    'Sec-Fetch-User': '?1',
                    'Upgrade-Insecure-Requests': '1',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/100.0.4896.75 Safari/537.36',
                    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="100", "Google Chrome";v="100"',
                    'sec-ch-ua-mobile': '?0',
                    'sec-ch-ua-platform': '"Windows"',
                    'token_authorization': 'U2FsdGVkX18/6NBYUPpHoOqljGWMuk7i7hMA8p1gefkEWMINDX7ADGYloRi72f7t'
                };
                
                var options = {
                    url: url,
                    headers: headers
                };
                
                function callback(error, response, body) {
                    if (!error && response.statusCode == 200) {
                        const $ = cheerio.load(body);
                        if($('#button_in_cart_hover').attr('alt').trim() == 'Agregar al Carro'){
                            Json.Stock = 'Disponible';
                        }else{
                            Json.Stock = 'Agotado';
                        }
                        res.send(Json)
                    }
                }
                
                request(options, callback);

            }
        }
        
        request(options, callback);
    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async DESCRIPCIONEDIT(req, res){
    try {

        let response = await Productos.find({Descripcion: RegExp(' LH', 'i'), Importadora: 'Mannheim'})
        console.log(response.length)
        var a = 0;
        for(var i = 0; i < response.length; i++){
            var Descripcion = response[i].Descripcion.replace('LH', 'IZQUIERDO');
            await Productos.updateOne({_id: response[i]._id}, {$set: { Descripcion: Descripcion } })
            console.log(i)
        }
        res.status(200).send('READY')


    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}


static async BICIMOTOOEM(req, res){
    try {

        for(var i = 0; i < ProductosChevrolet.length; i++){
            console.log(ProductosChevrolet[i].CodigoImportadora, ProductosChevrolet[i].OEM)
            await Productos.updateMany({ CodigoImportadora: ProductosChevrolet[i].CodigoImportadora, Importadora: 'Bicimoto'}, {$set: { OEM: ProductosChevrolet[i].OEM } } )
        }
        res.status(200).send('READY')


    } catch (err) {
        return res.status(200).json({ message: err.message});
    }
}

//Generador PDF
static async GENERAR_PDF(req, res){
    genPDF
    .generarPdfBase64(req)
    .then((result) => {
        if(result.id && result.id != -1){
                res.status(200).send({
                    code: 0,
                    value: "Generación de archivo exitosa.",
                    id: result.id,
                    data: { base64: result.base64 },
                });


            // const nDate = new Dstringifyate().toLocaleString('es-CL', {
            //     timeZone: 'America/Santiago'
            // });
        
            // Certificado.id = data.ides;   
            // Certificado.titulo = nombre_cert;
            // Certificado.fecha_creacion = nDate;
            // Certificado.autor = "SRCEI";
            // Certificado.data = JSON.stringify(data);

        } else {
            res.status(400).send(result)
        }
    })
    .catch((error) => {
        console.log(error)
        res.status(500).send({
            code: -1,
            value: "Error al generar archivo.",
            data: { error: error },
        });
    });
}


static async GET_TIMBRE(req, res){
    try {
        var options = { method: 'GET',
        url: 'https://libredte.cl/api/dte/dte_emitidos/ted/39/3299/77177455',
        qs: { formato: 'png', ecl: '5', size: '1' },
        encoding: null,
        headers: 
         { 
           authorization: 'dkRweVlOMUNNYXNuSUl6dlQ0eWNINXQ0bnJWOXdnZG46WA==',
           accept: 'application/json, image/png', 
           encoding: null
        } };
      
      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        var img = 'data:image/jpg;base64,' + Buffer.from(body).toString('base64')
        
        res.status(200).send({img})

      });


    } catch (error) {
        res.status(200).send(error)
    }
}


static async POST_DTE_COMPRA(req, res){
    try {
       return GetDTERecibido(res, req.body.Emisor, req.body.Folio)
    } catch (error) {
        res.status(200).send(error)
    }
}



static async POST_DTE_COMPRA(req, res){
    try {
       return GetDTERecibido(res, req.body.Emisor, req.body.Folio)
    } catch (error) {
        res.status(200).send(error)
    }
}


}
