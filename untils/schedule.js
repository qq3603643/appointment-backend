/*
	每日 00:00 清空rooms集合
**/
const schedule = require('node-schedule'),
	  room     = require('../models/room.js');

module.exports = () =>
{
	schedule.scheduleJob('00 00 00 * * *', () =>
	{
		room.deleteall((err) =>
		{
			if(err)
			{
				console.log(err);
			}
		})
	})
}