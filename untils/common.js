/* stime: '10:00' **/
module.exports =
{
	toMinutes(stime)              //convert '10:10' to minutes
	{
		const at = stime.split(/[^0-9]/);

		return at[0] * 60 + at[1] * 1;
	},
	isoverlap(n, min, max)
	{
		return n >= min && n <= max;
	},
	getClientIp(req)
	{
		return req.headers['x-forwarded-for']
		       || req.connection.remoteAddress
		       || req.socket.remoteAddress
		       || req.connection.socket.remoteAddress;
	},
	objrid(obj, attrs)             //rid attr in a obj, and return new
	{
		const _rid = (obj, attr) =>
		{
			var _res = new Object();

			for(var k in obj)
			{
				if(obj.hasOwnProperty(k) && k != attr)
				{
					console.log(k);
					_res[k] = obj[k];
				}
			}

			return _res;
		}

		if(typeof attrs == 'string')
			return _rid(obj, attrs);

		return attrs.reduce((str, attr) =>
		{
			return _rid(str, attr);
		}, obj)
	}
}