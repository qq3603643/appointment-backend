/*
	connect mongodb
**/

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/appointment');

module.exports = mongoose;
