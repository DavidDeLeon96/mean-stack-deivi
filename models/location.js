'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = Schema({
    name : {type : String, required: true},
    calle : {type: String, require: true},
    colonia : {type: String, require: true},
    cp : {type: Number, require: true},
    ciudad : {type: String, require: true},
    estado : {type: String, require: true},
    pais : {type: String, require: true},
    _user: {type: Schema.Types.ObjectId, ref: "User", require: true},
});

module.exports = mongoose.model('Location',LocationSchema);