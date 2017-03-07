const Socket = require('../models/socket.js'),
      room   = require('../models/room.js');

module.exports = (io) =>
{
    var container = new Socket();

    io.on('connection', (socket) =>
    {
        console.log('a client connect');

        socket.on('login', (o) =>
        {
            container.add(o.userid, socket);
            socket.name = o.userid;

            io.emit('login', { userid: o.userid, onlineCount: container.size() });
            container.except(socket).forEach(otherSocket =>
            {
                otherSocket.emit('welcome', { userid: o.userid })
            })

            console.log(`${o.userid} 进入系统`);
        })

        socket.on('message', (o) =>
        {
            io.emit('message', o);
        })

        socket.on('addroom', (o) =>
        {
            console.log(`${ o.roomitem.username }预定会议室`);

            room.isoccupied(o.roomitem, (res) =>
            {
                if(res.error != null)       //database query failed
                {
                    console.log(res.error);
                    socket.emit('error_room', { type: 'addroom_database_query', error: '数据库查询失败' });
                    return;
                }
                if(res.isoccupied)          //occupied
                {
                    socket.emit('error_room', { type: 'addroom_occupied', data: res.data });
                    return;
                }

                room.addroom(o.roomitem, (err) =>
                {
                    if(err)
                    {
                        console.log(err);
                        socket.emit('error_room', { type: 'addroom_database_query', error: '数据库插入失败' });
                    }
                    else
                    {
                        console.log(`${ o.roomitem.username }预定会议室成功`);
                        io.emit('addroom', o);
                    }
                })
            })
        })

        socket.on('disconnect', () =>
        {
            container.delete(socket.name);
            io.emit('logout', { userid: socket.name, onlineCount: container.size() });

            console.log(`${socket.id} 退出系统`)
        })

    })
}