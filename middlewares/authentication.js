import jwt from 'jsonwebtoken'
import Usuario from '../models/usuario.js'

async function authentication(req,res){
	const user = req.body.nombre_usuario
	const pass = req.body.contrasenia_usuario

	let userFound = ''

	//compruebo usuario
	try {
		userFound = await Usuario.findAll({where:{nombre_usuario:user}})
		

	}catch (error) {
		return res.status(400).json({'message':'User not found'})
	}

	//compruebo password
	if(userFound[0].contrasenia_usuario !== pass){
		return res.status(404).json({'message':'Incorrect password'})
	}

	//Generación del token
	const sub = userFound[0].id_usuario //sub : identificador del usuario
	const usuario = userFound[0].nombre_usuario 
	const nivel = userFound[0].nivel 


	//Firma y construccion del token
	const token = jwt.sign({
		sub,
		usuario,
		nivel,
		exp: Date.now() + (3600 * 1000) // 1 hora * milisegundo
	// eslint-disable-next-line no-undef
	}, process.env.SECRET_KEY)
	
	return res.status(200).json({ accessToken: token})
}

export default authentication
