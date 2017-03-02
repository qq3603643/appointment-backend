const Socket = require('../models/socket.js');

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

        socket.on('disconnect', () =>
        {
            container.delete(socket.name);
            io.emit('logout', { userid: socket.name, onlineCount: container.size() });

            console.log(`${socket.id} 退出系统`)
        })
    })
}