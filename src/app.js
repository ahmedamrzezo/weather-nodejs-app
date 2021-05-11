const path = require('path');

const express = require('express');

const hbs = require('hbs');

const app = express();

const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const PORT = process.env.PORT || 3555;

const PUBLIC_PATH = path.join(__dirname, '../public');
const VIEWS_PATH = path.join(__dirname, '../templates/views');
const PARTIALS_PATH = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', VIEWS_PATH);

hbs.registerPartials(PARTIALS_PATH);

app.use(express.static(PUBLIC_PATH));

app.get('', (req, res) => {
	res.render('app', { title: 'Weather APP' });
});
app.get('/help', (req, res) => {
	res.render('help', { title: 'Help page', help: 'I got a problem' });
});

app.get('/about', (req, res) => {
	res.render('app', { title: 'About page' });
});

app.get('/weather', (req, res) => {
	if (JSON.stringify(req.query) === '{}') {
		return res.send({
			address: '',
		});
	}
	if (req.query.address && req.query.address.length) {
		geocode(req.query.address, (err, { cords = [], location } = {}) => {
			if (err) {
				return res.send({ error: err });
			}
			forecast(cords[0], cords[1], (err, forecastData) => {
				if (err) {
					return res.send({ error: err });
				}
				return res.send({
					location,
					address: req.query.address,
					forecast: forecastData,
				});
			});
		});
	}

	if (!req.query.address) {
		return res.send({
			error: 'No address provided',
		});
	}
});

app.get('/portfolio', (req, res) => {
	console.log(req.query.technology);
	if (!req.query.technology) {
		return res.send({
			error: 'You have to provide technology',
		});
	}
	res.send({
		data: [],
		status: 200,
	});
});

app.get('**', (req, res) => {
	res.render('help', { title: '404', help: 'This page is not Found' });
});

app.listen(PORT, () => {
	console.log('Server is up, port ', PORT);
});
