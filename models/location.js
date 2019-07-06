'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var LocationSchema = Schema({
    name : {type : String, required: true}
});

module.exports = mongoose.model('Location',LocationSchema);