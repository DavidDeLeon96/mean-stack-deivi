'use strict'

var Location = require('../models/location');

exports.getUserLocation = function(req,res){

	Location.find({_user: req.params.id_usuario}).sort({name: 1}).exec(function(err, data){
		res.send({data: data});
	});
}

exports.getUserLocationById = function(req,res,next){//next regresa el siguiente elemento

	Location.findOne({_id: req.params.id,_user: req.params.id_usuario}).exec((err, location) => {
		if(err){
			next({status: 200, message: 'Location doesnt exists.'});
		} else {
			if(location)
				res.send(location);
			else{
				next({status: 200, message: 'Error retriving location.'});
			}
		}
	}); 
	
}

exports.addUserLocation = function(req,res,next){
	
	var location = new Location();
	
	Object.keys(req.body).forEach( key => {
		location[key] = req.body[key];
    })
    location._user = req.params.id_usuario;
	
	location.save( (err, userLocationStored) => {//save si hay error o no
		if(err){
			console.error(err);
			next({status: 200, message: 'Error saving location.'});
		} else {
			if(userLocationStored)
				res.send(userLocationStored);
			else{
				next({status: 200, message: 'Error saving location.'});
			}
		}
	});
	
}

exports.updateUserLocationById = function(req,res,next){ 
	
	var location = {};
	var params = req.body;
	Object.keys(req.body).forEach((key)=>{
		location[key] = req.body[key];		//
	});
	
					//busca por aqui		actualizalo		regresa el nuevo en true	ejecutalo en func arrow
	Location.findOneAndUpdate({_id:req.params.id,_user:req.params.id_usuario}, {$set: location}, {new: true} ).exec((err, location) => {
		if(err){
			console.log(err);
			next({status: 200, message: 'Error updating location.'});
		} else {
			if(location)
				res.send(location);	//res.json
			else{
				console.log('error')
				next({status: 200, message: 'Error updating location.'});
			}
		}
	});
	
}

exports.deleteUserLocationById = function(req,res,next){

	Location.findOneAndRemove({_id:req.params.id,_user:req.params.id_usuario}, (err, locationRemoved) => {
		if(err){
			next({status: 200, message: 'User location doesnt exists.'});
		} else {
			if(locationRemoved)
				res.send(locationRemoved);
			else{
				next({status: 200, message: 'Error deleting user location.'});
			}
		}
	});
	
}
