import jwt from 'jsonwebtoken'

// Middleware autenficicacion de token
function tokenAuthentication( req, res, next){
	const headerRecieved = req.headers['authorization']
	const tokenRecieved= headerRecieved.split(' ')[1]

	if(tokenRecieved == null){
		return res.status(401).json({'message':'Invalid token'})
	}
	
	let payload = null
	
	//Sacamos los datos del payload para validar el token
	try {
		// eslint-disable-next-line no-undef
		payload = jwt.verify(tokenRecieved, process.env.SECRET_KEY)
	} catch (error) {
		return res.status(401).json({'message':'Invalid token'})
	}

	if(Date.now() > payload.exp){
		return res.status(401).json({'message':'Expired token'})
	}

	// Token autorizado
	req.user = payload.sub
	req.nivel = payload.nivel

	next()

} 

export default tokenAuthentication