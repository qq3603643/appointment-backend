const server = require('express')(),
	  http   = require('http').Server(server),
	  io     = require('socket.io')(http);

module.exports = () =>
{
	var onlineUsers = new Object,
	    onlineCount = 0;

	// create connect
    io.on('connection', (socket) =>
    {
    	console.log('a user connect');
    	socket.set("origins","*");
    	socket.on('login', (userinfo) =>
    	{
    		socket.name = userinfo.userid;
    		if(!onlineUsers.hasOwnProperty(userinfo.userid))
			{
				onlineUsers[userinfo.userid] = userinfo.username;
				onlineCount ++;
			}

			io.emit('login', { onlineUsers: onlineUsers, onlineCount: onlineCount });
			console.log(`${ userinfo.userid } 进入系统`);
    	})

    	socket.on('disconnect', () =>
    	{
    		if(onlineUsers.hasOwnProperty(socket.name))
			{
				var userinfo_Signout = { userid: socket.name, username: onlineUsers[socket.name] };

				delete onlineUsers[socket.name];
				onlineCount --;

				io.emit('logout', { onlineUsers: onlineUsers, onlineCount: onlineCount });
				console.log(`${ userinfo_Signout.userid } 退出系统`);
			}
    	})

    	socket.on('message', (obj) =>
    	{
    		io.emit('message', obj);
    		console.log(obj);
    	})
    })

}