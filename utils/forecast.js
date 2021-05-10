const request = require('postman-request');

const forecast = (long, lat, cb) => {
	const url = `http://api.weatherstack.com/current?access_key=e780fe56612d8375d63123b359bca2ce&query=${lat},${long}`;

	request({ url, json: true }, (err, { body }) => {
		if (err) {
			return cb(err, undefined);
		} else if (body.error) {
			return cb('Unable to find location', undefined);
		}
		cb(undefined, body.current.temperature);
	});
};

module.exports = forecast;
