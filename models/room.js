/*
	room
**/
const mongoose = require('./mongoose.js'),
	  Schema  = mongoose.Schema;

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
	addroom: function(obj, cb)
	{
		const instance = new room(obj);

		instance.save((err) =>
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
