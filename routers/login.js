const express = require('express'),
	  user    = require('../models/user.js'),
	  t       = require('../untils/common.js'),
	  CONFIG_G = require('../untils/config.js');

module.exports = () =>
{
	const router = express.Router();

	CONFIG_G.allowOriginWithCookie &&
	router.all('*', (req, res, next) =>
	{
		/* 跨域携带cookie时 必须设置具体源 **/
		res.header("Access-Control-Allow-Origin", CONFIG_G.allowOriginWithCookie);
		res.header("Access-Control-Allow-Credentials", true);
		res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, yourHeaderFeild, access-control-allow-methods, access-control-allow-origin, cache-control");
		res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
		res.header("X-Powered-By",' 3.2.1');
		res.header("Content-Type", "application/json;charset=utf-8");
		next();
	});

	router.post('/check', (req, res, next) =>
	{
		const uid  = req.cookies.userid,
			  _isP = req.session[uid] == 'true';console.log(_isP);

		console.log(`someone is coming, uid: ${ uid }, _isLogined: ${ _isP }`);
		_isP &&
		 user.isExist_p(uid)
			.then(da =>
			{
				res.send({ status: 1, msg: 'success', data: da });
			})
			.catch(err =>
			{
				console.log(err);
				res.send({ status: 0, msg: 'database error' }).end();
			})

		!_isP &&
		 res.send({ status: 0, msg: 'no user' }).end();
	})

	router.post('/validate', (req, res, next) =>
	{
		console.log(`someone is logining: ${ req.body.username }, ${ req.body.password }`);

		user.validateU_p({ username: req.body.username, password: req.body.password })
			.then(da =>
			{
				if(da)
				{
					const id = da._id;

					res.cookie('userid', id, { path: '/', maxAge: 66 * 24 * 60 * 60 * 1e3 });
					req.session[id] = 'true';

					res.send({ status: 1, msg: 'success', data: da });
				}
				else
					res.send({ status: 0, msg: 'user or password is error' }).end();
			})
			.catch(err =>
			{
				res.send({ status: 0, msg: 'database error' }).end();
			})
	})

	return router;
}