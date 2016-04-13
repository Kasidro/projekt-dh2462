module.exports = function (app) {
	app.get('/get', function (req, res) {
		res.send('katt');
	});
}
