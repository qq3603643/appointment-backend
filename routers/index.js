const express = require('express'),
	  room = require('../models/room.js');

module.exports = () =>
{
	const router = express.Router();

	router.get('/', (req, res, next) =>
	{
		res.render(
			'index.ejs',
			{
				name:'apple',
				data: { sex: 'man' }
		    }
			);
	})

	router.post('/getall', (req, res, next) =>
	{
		room.getallrooms((err, obj) =>
		{
			if(err)
			{
				console.log(err);
				res.send({ status: 0, msg: 'database error' }).end();
			}
			else
				res.send({ status: 1, msg: 'succes', data: obj });
		})
	})

	router.post('/addroom', (req, res, next) =>
	{
		console.log(req.body);
		room.addroom(req.body, (err) =>{
			if(err)
			{
				console.log(err);
				res.send({ status: 0, msg: 'database error' }).end();
			}
			else
				res.send({ status: 1, msg: 'succes' });
		})
	})

	return router;
}