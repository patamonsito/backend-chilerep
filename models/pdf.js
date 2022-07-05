const pdf2base64 = require("pdf-to-base64");
const pdf = require("html-pdf");
const fs = require("fs");
const qrcode = require("qrcode");
const ejs = require("ejs");
const Boletas = require("./boletas");
const Facturas = require("./facturas");
const Abonos = require("./abonos");
const request = require('request').defaults({
    jar: jar,
    followAllRedirects: true
  });
var jar = request.jar();

async function generarPdfBase64(req) {
    const certName = req.params.certificado; // GET certificado datos
    let config = {}; // Configuracion Inicial


        return new Promise(async (resolve, rejects) => { // Enviamos una promesa

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
          
          request(options, async function (error, response, body) {
            if(error){
                console.log(error)
                return res.status(200).send(error);
            }
            
            var img = 'data:image/jpg;base64,' + Buffer.from(body).toString('base64')    

            let res = {};
            if(req.params.dte == 'Boleta'){
                res  = await Boletas.findOne({_id: req.params.id})
            }else if(req.params.dte == 'Factura'){
                console.log('es factura')
                res  = await Facturas.findOne({_id: req.params.id})
                console.log()
            }else if(req.params.dte == 'Abono'){
                res  = await Abonos.findOne({_id: req.params.id})
            }

            if(certName == 'Letter'){
                console.log(res)
                console.log(res.Detalles.length)

                

                config = {
                        height: (217 + (3 * res.Detalles.length)) + "mm",
                        width: "80mm",
                        orientation: "landscape",
                        border: {
                            top: "0.1cm",
                            right: "0.1cm",
                            bottom: "0.1cm",
                            left: "0.1cm",
                        },
                }
            }


            let data = {
                "certificado": req.params.certificado,
                "data": {
                    img: img,
                },
                ...res
            }
            ejs.renderFile(`./template/Letter.ejs`,data, (err, str) => { // Cargamos el certificado y le enviamos los datos
                if(err){
                    console.log(err);
                }
                let fn = "f" + new Date().valueOf().toString(16); // Genera un string random
                pdf.create(str, config).toFile(`./salida/${fn}.pdf`, (err, arch) => { // Cremos el PDF asignamos la salida el nombre sera el string random, cargamos la configuracion y la respuesta del ejs
                if (err) {
                    fs.unlinkSync(arch.filename); // Si hay un error elimina el archivo
                    rejects(err); // manda respuesta del error
                } else {
                    pdf2base64(arch.filename) // Comienza a crear el pdf
                    .then(async (result) => { // Envia el resultado asincrono
                        try{
                            // let resData = await  reg.ingresarCertificado(req.body.certificado, req.body.data); // Hay q configurar la base de datos.
                            fs.unlinkSync(arch.filename); // Eliminamos el archivo
                            resolve({id: '123', base64: result}); // Lo pasamos como dato
                        } catch(ex) {
                            rejects(ex);
                        }
                    })
                    .catch((err) => {
                        rejects(err);
                    });
                }
            
            })
            })
        })
    })
}

async function buscarPdfBase64(id) {
    return new Promise((resolve, rejects) => {
        reg.buscarCertificado(id,(err, rows)=>{ // Hacer la consulta y buscar en la base de datos
           
            if (err) {
                console.log("ERROR : ",err);            
            } else {            
                let data = JSON.parse(rows[0].data);
                    ejs.renderFile(`./template/${rows[0].titulo}.ejs`,data,(err, str) => {
                        if (err) {
                            console.log("err:",err);
                            rejects(err);
                        } else {
                            pdf.create(str, config).toFile(`./salida/CertS.pdf`, (err, arch) => {
                                if (err) {
                                    console.log("err:",err);
                                    fs.unlinkSync(arch.filename);
                                    rejects(err);
                                } else {
                                    pdf2base64(arch.filename)
                                    .then((result) => {
                                        fs.unlinkSync(arch.filename);
                                        resolve(result);
                                    })
                                    .catch((err) => {
                                        console.log("err:",err);
                                        rejects(err);
                                    });
                                }
                            });
                        }
                    });
                }
            });
        });
}



module.exports = { 
    generarPdfBase64,
    buscarPdfBase64 };
