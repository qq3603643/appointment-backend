const express = require('express'),
      static  = require('express-static'),
      bodyParser = require('body-parser'),
      multer     = require('multer'),
      cookieParser  = require('cookie-parser'),
      sessionParser = require('cookie-session'),
      consolidate   = require('consolidate');

const app = express(),
	  http   = require('http').Server(app),
	  io     = require('socket.io')(http);

//socket
require('./routers/socket.js')(io);

// cookie
app.use(cookieParser('xjc'));

//session
app.use(sessionParser(
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
app.use(bodyParser.urlencoded({ extended: !1 }));

//file
app.use(multer({dest: './public/upload'}).any());

//template engine
app.set('view engine', 'html');
app.set('views', './public/template');
app.engine('html', consolidate.ejs);

//router
app.use('/', require('./routers/index.js')());

//static
app.use(static('./public'));

http.listen(3333, () =>
	{
		console.log('port3333 is watching')
	});