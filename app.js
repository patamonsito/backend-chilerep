// import
require("dotenv").config();
const express = require("express");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const socket = require('./socket');

const mongoose = require("mongoose");
const cors = require("cors");
const path = require('path');
var json2xls = require('json2xls');

const bodyParser = require("body-parser");
const fs = require("fs");

const session = require('express-session');
const MongoStore = require('connect-mongo');
mongoose.Promise = global.Promise; 
const port = process.env.PORT // 3000;


socket.connect(server);


app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));


// middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "uploads/avatars")));

// database connection
const conn = require('./conection');
const { env } = require("process");


//configuracion de session
let store = new MongoStore({
    mongoUrl: process.env.DB_LOCAL,
    collection: "sessions"
 });

app.use(
    session({
        secret: process.env.SESSION_SECRET || 'Chilerepuestos',
        resave: false,
        store: store,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 24 hours
      })
      );


// router prefix
app.use('/api', require('./routes/routes'))
const jsonArr = [{
    foo: 'bar',
    qux: 'moo',
    poo: 123,
    stux: new Date()
},
{
    foo: 'bar',
    qux: 'moo',
    poo: 345,
    stux: new Date()
}];

app.use(json2xls.middleware);

app.post('/api/catalogo-to-excel',function(req, res) {
    var { Json, Name } = req.body;

    console.log(Json, Name)

    res.setHeader ("Content-type", "application/octet-stream");
    res.setHeader("Content-Disposition", "adjunto; filename =" + 'meow' + ". xlsx");

    return res.xls(Name + '.xlsx', Json);
});

// Plantillas PDF
app.get("/plantillas", function (req, res) {
    let files = fs.readdirSync('./public/');
    files = files.filter(function (file) { return file.indexOf(".html") > 0})
    let outout = `<h3>Plantillas Disponibles</h3>
        <style>
        div.container{
            display: grid;
            text-align: center;
            gap:1rem;
            grid-template-columns: 1fr 1fr 1fr 1fr;
        }
        div.box {
            padding:1rem;
            border:solid 1px #aaa;
        }
        div.box img{
            margin: 0 auto;
            display:block;
            width:50px
        }
        </style>
        <div class="container">
    `;

    files.forEach(function (file) {
        if (file != 'index.html'){
            outout += "<div class='box'><img src='img/file.png' /><a href='" + file + "'>" + file + "</a></div>";
        }
    })
    outout += "</div>";
    res.send(outout);
});


//START SERVER

server.listen(port, () => console.log(`server running at http://localhost:${port}`))