/*
	house
**/
const mongoose = require('./mongoose.js'),
	  Schema  = mongoose.Schema;

const houseSchema = new Schema(
		{
			roomid: String,        // 会议室id
			roomname: String,	   // 会议室名称
			describe: String 	   // 会议室描述
		}),
	  house = mongoose.model('houses', houseSchema),
	  House = new Function;

House.prototype =
{
	constructor: House,
	getallhouse: function(cb)
	{
		house.find({}, (err, obj) =>
		{
			cb(err, obj);
		})
	},
	getallhouse_p: function()
	{
		return new Promise((resolve, reject) =>
		{
			house.find({}, (err, obj) =>
			{
				if(err)
				{
					console.log(err);
					reject(err);
				}
				else
				{
					resolve(obj);
				}
			})
		})
	}
}

module.exports = new House();