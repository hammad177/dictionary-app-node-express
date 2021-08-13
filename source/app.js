/** @format */

const experss = require('express');
const request = require('request');
const path = require('path');
const hbs = require('hbs');

const app = experss();

const viewsFolder = path.join(__dirname, '../templates/views');
app.set('views', viewsFolder);

const partialsFolder = path.join(__dirname, '../templates/partials');
hbs.registerPartials(partialsFolder);

const publicFolder = path.join(__dirname, '../public');
app.use(experss.static(publicFolder));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
	res.render('index');
});

app.get('/search', (req, res) => {
	const { word } = req.query;
	if (!word) {
		return res.send({ error: 'Word not provided' });
	}

	const options = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;

	const callback = (error, response) => {
		console.log('error:', error);
		console.log('response', response && response.statusCode);
		const parseData = JSON.parse(response.body);
		const definition =
			response && response.statusCode === 200
				? parseData[0].meanings[0].definitions[0].definition
				: 'Sorry, Word not found in dictionary';
		const data = {
			word,
			error,
			statusCode: response.statusCode,
			definition,
		};
		return res.send(data);
	};
	request(options, callback);
});

app.listen(5000, () => {
	console.log('server is listening at port 5000');
});
