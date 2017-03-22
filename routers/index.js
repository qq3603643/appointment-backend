const express = require('express'),
	  room  = require('../models/room.js'),
	  house = require('../models/house.js'),
	  user  = require('../models/user.js');

const $CONFIG_G = require('../untils/config.js'),
	  t         = require('../untils/common.js');

module.exports = () =>
{
	const router = express.Router();

	router.get('/', (req, res, next) =>
	{
		console.log(t.getClientIp(req));

		res.render(
			'index.ejs',
			{
				$ctx: $CONFIG_G.$ctx
		    }
			);
	})

	//cross domain
	router.all('*', (req, res, next) =>
	{

		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild, access-control-allow-methods, access-control-allow-origin, cache-control");
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