/*
	room
**/
const mongoose = require('./mongoose.js'),
	  Schema   = mongoose.Schema,
	  t        = require('../untils/common.js');

const roomSchema = new Schema(
		{
			roomid: { type: String, required: true },      //占用房间id
			username: { type: String, required: true },    //使用者名字
			starttime: { type: String, required: true },   //开始时间
			endtime: { type: String, required: true },     //结束时间
			reason: { type: String }                       //使用理由
		}),
	  room = mongoose.model('rooms', roomSchema),
	  Room = new Function;

Room.prototype =
{
	consturctor: Room,
	getallrooms: function(cb)
	{
		room.find({}, (err, obj) =>
		{
			cb(err, obj);
		})
	},
	isoccupied: function(roomitem, cb)
	{
		const roomid = roomitem.roomid,
			  starttime = roomitem.starttime,
			  endtime = roomitem.endtime;
		var res =
		{
			error: null,
			isoccupied: null,
			data: null
		};

		this.getallrooms((err, data) =>
		{
			if(err)
			{
				console.error(err);
				res.error = err;
				cb(res);
				return;
			}

			if(data.length == 0)
			{
				cb(res);
				return;
			}

			var i = 0,
				_roomitem;

			while(_roomitem = data[i++])
			{
				if(_roomitem.roomid == roomitem.roomid)
				{
					var _starttime = _roomitem.starttime,
						_endtime   = _roomitem.endtime;

					if(t.isoverlap(t.toMinutes(starttime) + 1, t.toMinutes(_starttime), t.toMinutes(_endtime))
						|| t.isoverlap(t.toMinutes(endtime) - 1, t.toMinutes(_starttime), t.toMinutes(_endtime)))
					{
						res.isoccupied = !0;
						res.data = _roomitem;
						cb(res);
						break;
					}
				}
			}

			if(!res.isoccupied)	cb(res);
		})
	},
	addroom: function(obj, cb)
	{
		const instance = new room(obj);

		instance.save((err) =>
		{
			cb(err);
		})
	},
	deleteall: function(cb)
	{
		room.remove({}, (err) =>
		{
			cb(err);
		})
	},
	deleteById: function(id, cb)
	{
		room.remove({ _id: id }, (err) =>
		{
			cb(err);
		})
	}
}

module.exports = new Room();
