const express = require('express'),
      static  = require('express-static'),
      bodyParser = require('body-parser'),
      multer     = require('multer'),
      cookieParser  = require('cookie-parser'),
      sessionParser = require('cookie-session'),
      consolidate   = require('consolidate');

const server = express();

// cookie
server.use(cookieParser('xjc'));

//session
server.use(sessionParser(
{
	name: 'sess',
	keys: (()=>{
		var keys = new Array;
		while(keys.length < 100000)
			keys.push('keys_' + Math.random());

		return keys;
	})(),
	maxAge: 1 * 24 * 60 * 60 * 1000
}))

//post
server.use(bodyParser.urlencoded({ extended: !1 }));

//file
server.use(multer({dest: './public/upload'}).any());

//template engine
server.set('view engine', 'html');
server.set('views', './public/template');
server.engine('html', consolidate.ejs);

//router
server.use('/', require('./routers/index.js')());

//static
server.use(static('./public'));

server.listen(7777);