const express = require('express'),
	  room  = require('../models/room.js'),
	  house = require('../models/house.js');

const $CONFIG_G = require('../untils/config.js');

module.exports = () =>
{
	const router = express.Router();

	router.get('/', (req, res, next) =>
	{
		res.render(
			'index.ejs',
			{
				$ctx: `http://localhost:${ $CONFIG_G.$port }`
		    }
			);
	})

	//cross domain
	router.all('*', (req, res, next) =>
	{
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1');
		res.header("Content-Type", "application/json;charset=utf-8");
		next();
	});

	router.post('/getall', (req, res, next) =>
	{
		// room.getallrooms((err, obj) =>
		// {
		// 	if(err)
		// 	{
		// 		console.log(err);
		// 		res.send({ status: 0, msg: 'database error' }).end();
		// 	}
		// 	else
		// 		res.send({ status: 1, msg: 'succes', data: obj });
		// })

		room.getallrooms_p()
			.then(data =>
			{
				res.send({ status: 1, msg: 'succes', data: data });
			})
			.catch(err =>
			{
				console.log(err);
				res.send({ status: 0, msg: 'database error' }).end();
			})
	})

	router.post('/addroom', (req, res, next) =>
	{
		// room.addroom(req.body, (err) =>{
		// 	if(err)
		// 	{
		// 		console.log(err);
		// 		res.send({ status: 0, msg: 'database error' }).end();
		// 	}
		// 	else
		// 		res.send({ status: 1, msg: 'succes' });
		// })

		room.addroom_p(req.body)
			.then(() =>
			{
				res.send({ status: 1, msg: 'succes' });
			})
			.catch(err =>
			{
				console.log(err);
				res.send({ status: 0, msg: 'database error' }).end();
			})
	})

	router.post('/getallhouse', (req, res, next) =>
	{
		// house.getallhouse((err, obj) =>
		// {
		// 	if(err)
		// 	{
		// 		console.log(err);
		// 		res.send({ status: 0, msg: 'database error' }).end();
		// 	}
		// 	else
		// 		res.send({ status: 1, msg: 'success', data: obj });
		// })

		house.getallhouse_p()
			 .then(data =>
			 {
			 	res.send({ status: 1, msg: 'success', data: data });
			 })
			 .catch(err =>
			 {
			 	console.log(err);
			 	res.send({ status: 0, msg: 'database error' }).end();
			 })
	})

	return router;
}