/*
	connect mongodb
**/

const mongoose  = require('mongoose'),
	  $CONFIG_G = require('../untils/config.js');

mongoose.connect(`mongodb://${ $CONFIG_G.mongo.$ip }:${ $CONFIG_G.mongo.$port }/${ $CONFIG_G.mongo.$databasename }`);

module.exports = mongoose;
