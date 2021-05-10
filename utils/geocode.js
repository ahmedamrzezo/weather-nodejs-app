const request = require('postman-request');

const mapsApiKey =
	'pk.eyJ1IjoiYWhtZWRhbXJ6ZXpvIiwiYSI6ImNrbzByMjh2dTAxZGkyd28zMjFpcXVwYXoifQ.zAYx2QEIjFNQ0tpZ8g9X9Q';
const mapbox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const geocode = (address, cb) => {
	const url = `${mapbox}${encodeURIComponent(
		address
	)}.json?limit=1&access_token=${mapsApiKey}`;
	request({ url, json: true }, (err, { body }) => {
		if (err) {
			return cb(err, undefined);
		} else if (!body.features.length) {
			return cb('Unable to find location', undefined);
		}
		const cords = body.features[0].center;
		cb(undefined, { address, cords, location: body.features[0].place_name });
	});
};

module.exports = geocode;
