
function error404(req, res) {
	return res.status(404).send('<h1>ERROR 404 </h1>')
}

export default error404

