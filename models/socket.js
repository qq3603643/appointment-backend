function User(id, socketitem)
{
	this.userid = id;
	this.socket = socketitem;
}

function Socket()
{
	/*
		userModel { userid: socketitem }
	**/
	this.sockets = [];
}

Socket.prototype =
{
	constructor: Socket,
	isEmpty: function()                   //是否为空
	{
		return this.size() == 0;
	},
	size: function()					  //size 即连接人数(多个用户算作一个)
	{
		return this.sockets.reduce((str, socket) =>
			   {
					if(~str.indexOf(socket.userid))
						return str;
					return str.concat(socket.userid);
			   }, new Array).length;
	},
	getuserid: function(socket)
	{
		var userid;

		this.sockets.forEach(socketItem =>
		{
			if(socketItem.socket == socket)
				userid = socketItem.userid;
		})

		return userid;
	},
	isExist: function(userid)	          //检测是否已存在
	{
		var _exist = false;

		if(this.isEmpty())
			return _exist;

		var i = 0,
			o;
		while(o = this.sockets[i++])
		{
			if(o.userid == userid)
			{
				_exist = !_exist;
				break;
			}
		}

		return _exist;
	},
	add: function(userid, socketitem)	  //添加连接
	{
		// if(!this.isExist(userid))
		this.sockets.push(new User(userid, socketitem));

		return this;
	},
	delete: function(userid)              //删除连接
	{
		if(!this.isExist(userid))
		{
			console.log(`${userid} 不存在`);
			return this;
		}

		this.sockets = this.sockets.filter(function(o)
		{
			return o.userid != userid;
		})
		console.log(`${userid} 已删除`);

		return this;
	},
	delete_s: function(socket)
	{
		this.sockets = this.sockets.filter(o => o.socket != socket);
	},
	all: function()                      //获取所有连接实例
	{
		return this.socket.map(function(o)
		{
			return o.socket
		})
	},
	except: function(socket)             //获取除去某连接的其他所有连接的socket实例
	{
		return this.sockets.filter(function(o){ return o != socket }).map(function(o)
		{
			return o.socket;
		})
	},
	repalceuid: function(uid_origin, uid_future)
	{
		this.sockets = this.sockets.map((socket) =>
		{
			return socket.userid == uid_origin
				   ? new User(uid_future, socket.socket)
				   : socket;
		})

		return this;
	}
}

module.exports = new Socket();