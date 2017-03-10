/* stime: '10:00' **/
module.exports =
{
	toMinutes(stime)
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
	}
}