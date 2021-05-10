const form = document.querySelector('.weather-form');

const fetchForecast = (address) => {
	return fetch(`http://localhost:3555/weather?address=${address}`, {
		method: 'GET',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
		},
	});
};

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const address = encodeURIComponent(form.elements.address.value);

	fetchForecast(address)
		.then((res) => res.json())
		.then(({ error, location, forecast }) => {
			if (error) {
				console.error(error);
				return;
			}

			console.log(location);
			console.log(forecast);
		})
		.catch((err) => console.error(err));
});
