'use strict'

var User = require('../models/user');

/***************************************
*
*
*	Users functions
*
*
***************************************/

exports.getUsers = function(req,res){
	/**
	* Return a list of KIO user
	*
	* returns User
	**/
	User.find({}).sort({f_name: 1}).exec(function(err, data){
		res.send({data: data});
	});
}

exports.getUserById = function(req,res,next){//next regresa el siguiente elemento
	/**
	* Return a KIO user information
	*
	* id Long Id of the user to retrive information
	* returns User
	**/
	User.findById(req.params.id).exec((err, user) => {
		if(err){
			next({status: 200, message: 'User doesnt exists.'});
		} else {
			if(user)
				res.send(user);
			else{
				next({status: 200, message: 'Error retriving user.'});
			}
		}
	});
	
}

exports.addUser = function(req,res,next){
	/**
	* Creates a new user.
	*
	* user User 
	* returns User
	**/
	var user = new User(); //User esquema de mongo
	
	Object.keys(req.body).forEach( key => {
		user[key] = req.body[key];
	})
	
	user.save( (err, userStored) => {//save si hay error o no
		if(err){
			console.error(err);
			next({status: 200, message: 'User already exists.'});
		} else {
			if(userStored)
				res.send(userStored);
			else{
				next({status: 200, message: 'Error saving user.'});
			}
		}
	});
	
}


exports.updateUserById = function(req,res,next){
	/**
	* Delete KIO user.
	*
	* id Long ID of th KIO user to update
	* returns User
	**/
	var user = {};
	var params = req.body;
	Object.keys(req.body).forEach((key)=>{
		user[key] = req.body[key];		//
	});
	
					//busca por aqui		actualizalo		regresa el nuevo en true	ejecutalo en func arrow
	User.findByIdAndUpdate(req.params.id, {$set: user}, {new: true} ).exec((err, user) => {
		if(err){
			console.log(err);
			next({status: 200, message: 'Error updating user.'});
		} else {
			if(user)
				res.send(user);	//res.json
			else{
				console.log('error')
				next({status: 200, message: 'Error updating user.'});
			}
		}
	});
	
}

exports.deleteUserById = function(req,res,next){
	/**
	* Delete user.
	*
	* id Long ID of th KIO user to delete
	* returns User
	**/
	User.remove({_id:req.params.id}, (err, userRemoved) => {
		if(err){
			next({status: 200, message: 'User doesnt exists.'});
		} else {
			if(userRemoved)
				res.send(userRemoved);
			else{
				next({status: 200, message: 'Error deleting user.'});
			}
		}
	});
	
}

exports.addUserDevice = function(req,res,next){
	res.send(req.body);
	/*
	var device = req.body;
	User.findByIdAndUpdate(req.params.id_usuario, {$push: {devices: device}}, {new: true} ).exec((err, user) => {
		if(err){
			console.log(err);
			next({status: 200, message: 'Error updating device.'});
		} else {
			if(user)
				res.send(user);	//res.json
			else{
				console.log('error')
				next({status: 200, message: 'Error updating device.'});
			}
		}
	});
	*/
}

