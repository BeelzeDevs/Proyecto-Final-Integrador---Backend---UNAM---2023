
function makeBody(req,res,next){
	if((req.method !== 'POST') && (req.method !== 'PATCH')){ return next() }

	if(req.headers['content-type'] !== 'application/json'){ return next() }

	let bodytemp = ''

	req.on('data',(chunk) => {
		bodytemp += chunk.toString()
	})

	req.on('end',() => {
		const data = JSON.parse(bodytemp)
		req.body=data
		next()
	})
}

export default makeBody