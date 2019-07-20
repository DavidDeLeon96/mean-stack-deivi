'use strict'

var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/meanstack', (err,res) => {//puede que se conecta o no
																		//conectate y envia una respuesta
	if(err){
		throw err;
	} else {
		console.log('connected');
	}
})

/* GET home page. */
router.get('/', function(req, res, next) {
	res.status(200).send({message:'welcome to the API'});
});


//modules
require('./users')(router);//importar cada modulo
require('./location')(router);
require('./auth')(router);

module.exports = router;
