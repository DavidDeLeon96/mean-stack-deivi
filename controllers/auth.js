var User = require('../models/user');
const bcrypt = require('bcrypt');
var moment = require('moment');
var jwt = require('jwt-simple');

var jwtSecret = 'cotton';


exports.doLogin = function(req,res,next){
    //res.send(req.body);
    
    
    User.findOne({email:req.body.email}).select("+password").lean().exec((err, user) => {
		if(err){
			//console.log(err);
			next({status: 200, message: 'Authentification error.'});
		} else {

			if(user && user.password){
                console.log(req.body.password, user.password);
                var valideUser = bcrypt.compareSync(req.body.password, user.password); 
                if(valideUser){
                    var tokenData = {
                        id: user._id,
                        cd: new Date(),
                        ip: req._remoteAddress,
                        exp: moment().add(30, 'days')
                    }
                    var token = jwt.encode(tokenData, jwtSecret);
                    delete user.password;
                    var userData = {
                        
                        user: user, 
                        token: token
                    }

                    res.send(userData);
                    console.log(req._remoteAddress)
                }else{
                    next({status: 200, message: 'Authentification error.'});
                }
            }else{
				//console.log('error')
				next({status: 200, message: 'Authentification error.'});
			}
		}
	});
    
    /*var location = new Location();
	
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
    */
	
}

exports.validateToken = function(req,res,next){
    var decoded = jwt.decode(req.body.token, jwtSecret);
    /*
    res.send(decoded);
    return
    */
    
    User.findOne({email:req.body.email}).select("+password").lean().exec((err, user) => {
		if(err){
			//console.log(err);
			next({status: 200, message: 'Authentification error.'});
		} else {

			if(user && user.password){
                console.log(req.body.password, user.password);
                var valideUser = bcrypt.compareSync(req.body.password, user.password); 
                if(valideUser){
                    var tokenData = {
                        id: user._id,
                        cd: new Date(),
                        ip: req._remoteAddress,
                        exp: moment().add(30, 'days')
                    }
                    var token = jwt.encode(tokenData, jwtSecret);
                    delete user.password;
                    var userData = {
                        
                        user: user, 
                        token: token
                    }

                    res.send(userData);
                    console.log(req._remoteAddress)
                }else{
                    next({status: 200, message: 'Authentification error.'});
                }
            }else{
				//console.log('error')
				next({status: 200, message: 'Authentification error.'});
			}
		}
	});
    
    /*var location = new Location();
	
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
    */
	
}