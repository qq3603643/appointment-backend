/*
	每日 00:00 清空rooms集合 备份在public/backup/y_m_d.txt中
**/
const fs       = require('fs'),
	  schedule = require('node-schedule'),
	  room     = require('../models/room.js');

const getdate = () =>
	  {
			const d = new Date(),
				  _y = d.getFullYear(),
				  _m = d.getMonth(),
				  _d = d.getDate();

		    return [_y, _m, _d].join('_');
	  },
	  backup = (opt) =>
	  {
	  		var dft = { data: '', path: `./public/backups/${ getdate() }.txt` },
	  			cfg = Object.assign({}, dft, opt);

  			return new Promise((resolve, reject) =>
  			{
  				const writerStream = fs.createWriteStream(cfg.path),
	  			      content      = JSON.stringify(cfg.data);

	  			writerStream.write(content, 'UTF8');

	  			writerStream.end();

	  			writerStream.on('finish', () =>
	  			{
	  				resolve();
	  			})
	  			writerStream.on('error', (err) =>
	  			{
	  				console.log(err);
	  				reject(err);
	  			})
  			})
	  };

module.exports = () =>
{
	schedule.scheduleJob('00 00 00 * * *', () =>
	{
		room.getallrooms((err, data) =>
		{
			if(err)
			{
				console.log(err);
				return;
			}
			backup({ data })
			.then(() =>
			{
				console.log('backuped completely, ready to delete orgin..');
				room.deleteall((err) =>
				{
					if(err)
					{
						console.log(err);
						return;
					}
					console.log('new day is starting, good luck');
				})
			})
			.catch((err) =>
			{
				console.log('encounter error to backup database..', err);
			})
		})
	})
}