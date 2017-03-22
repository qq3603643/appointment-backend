const mongoose = require('./mongoose.js'),
	  Schema   = mongoose.Schema;

const userSchema = new Schema(
		{
			username: { type: 'String', required: true },
			password: { type: 'String', required: true },
			department: { type: 'String' }
		}),
	  user = mongoose.model('users', userSchema),
	  User = new Function;

User.prototype =
{
	constructor: User,
	getall_p: function()
	{
		return new Promise((resolve, reject) =>
		{
			user.find({}, (err, da) =>
			{
				if(err)
				{
					console.log(err);
					reject(err);
					return;
				}

				resolve(da);
			})
		})
	},
	isExist_p: function(userid)
	{
		return new Promise((resolve, reject) =>
		{
			/* - 不返回某个参数 **/
			user.findOne({ _id: mongoose.Types.ObjectId(userid) }, '-password', (err, da) =>
			{
				if(err)
				{
					console.log(err);
					reject(err);
					return;
				}
				var _isEmpty = !1;
				try{ _isEmpty = da.length == 0 || da == null }
				catch(er){}
				/* isExist_p.then(da => { if(da) console.log('exist') }) **/
				if(_isEmpty) resolve(null);
				else  		 resolve(da);
			})
		})
	},
	validateU_p: function(o)
	{
		const username = o.username,
		      password = o.password;

		return new Promise((resolve, reject) =>
		{
			user.findOne({ username: username }, (err, da) =>
			{
				if(err)
				{
					console.log(err);
					reject(err);
					return;
				}
				var _isEmpty = !1;
				try{ _isEmpty = da.length == 0 || da == null || password != da.password }
				catch(er){}
				/* isExist_p.then(da => { if(da) console.log('exist') }) **/
				if(_isEmpty) resolve(null);
				else  		 resolve(da);
			})
		})
	}
}

module.exports = new User();