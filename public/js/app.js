/** @format */

function fetchWord() {
	let word = document.getElementById('txt-word').value;

	let loading = document.getElementById('loading');

	loading.style.display = 'block';

	fetch(`search/?word=${word}`)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			loading.style.display = 'none';
			document.getElementById('word').innerHTML = `Word: "${data.word}"`;
			document.getElementById(
				'definition',
			).innerHTML = `Definition: "${data.definition}"`;
		})
		.catch((err) => {
			console.log('err data==>>', err);
		});
	document.getElementById('txt-word').value = '';
}
