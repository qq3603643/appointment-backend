
module.exports = (io) =>
{
	var onlineUsers = new Object,
        sockets     = new Object,
	    onlineCount = 0;

	// create connect
    io.on('connection', (socket) =>
    {
    	console.log('a user connect');
    	socket.on('login', (userinfo) =>
    	{
    		socket.name = userinfo.userid;
    		if(!onlineUsers.hasOwnProperty(userinfo.userid))
			{
				onlineUsers[userinfo.userid] = userinfo.username;
                sockets[userinfo.userid]     = socket;
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
                delete sockets[socket.name];
				onlineCount --;

				io.emit('signout', { onlineUsers: onlineUsers, onlineCount: onlineCount });
				console.log(`${ userinfo_Signout.userid } 退出系统`);
			}
    	})

    	socket.on('message', (obj) =>
    	{
    		//io.emit('message', obj);  //all user
            for(var k in onlineUsers)   //special user
            {
                if(onlineUsers.hasOwnProperty(k) && k != socket.name)
                {
                    sockets[k].emit('message', obj);
                }
            }
    		console.log(obj);
    	})
    })

}