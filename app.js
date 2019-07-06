var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger-definitions/swagger.json');
var config = require('config');//extrayedo confg

var appRoutes = require('./routes/v1/app'); //version de app, ruta de donde se carga

var app = express();  //instancia de express



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev')); //todo lo que resivamos va a pasar por morgan
app.use(bodyParser.json({ limit: '50mb' }));//tranformar informacion a json
app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

// CORS peticiones de origen crusado, corriendo en local host
app.use(function(req, res, next){//
	res.setHeader('Access-Control-Allow-Origin', '*');//con * se puede ser usada por cualquier URL, todas la peticiones
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');//OPC saber si la URL existe
  next();//se pasa a lo siguiente
});
//? operador terniario si   se cumple         haz esto        sino esto
var api_path = (config && config.api_path) ? config.api_path : '';//se da de alta carpeta confing y defa
                                                              //default.json
// Define routes
app.use(api_path + '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));//declarado el swager
app.use(api_path + '/v1', appRoutes);//todas las rutas en la ruta v1
app.use(api_path + '/', function(req, res, next) {
  res.status(200).send({message:'root path... nothing to do here'});//default
});

app.use(function(err, req, res, next) {//ruta default, todo lo que no entre arriba entra aqui
  if (!err.status)                      //gestor de errores
      err.status = 404;             //sino se encuentra manda el 404
  var error = new Error();
  error.status = err.status;
  error.message = err.message;
  error.error = (err.error || '');
  res.status(error.status).send({ status: 'error', message: (error.message || 'Internal error'), error: error.error });
});



module.exports = app;
