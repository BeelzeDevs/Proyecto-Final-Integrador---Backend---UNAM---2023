import Usuario from '../models/usuario.js'

// 0- nivel 3 ADMIN, el listado completo de usuarios sin baja lógica.  
export async function listUsersStateTrue(req,res){

	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allUsers = await Usuario.findAll({where:{estado_usuario: true}}) 
		return res.status(200).json(allUsers)
	}catch(error){
		return res.status(204).json({'message': error})
	}

}

// 1- nivel 3 ADMIN, el listado completo de usuarios.*/
export async function listAllUsers(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allUsers = await Usuario.findAll() 
		return res.status(200).json(allUsers)
	}catch(error){
		return res.status(204).json({'message': error})
	}
	
}

// 2-nivel 3 ADMIN, datos de un usuario en particular consignado por su número de id 
export async function listUserByID(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	try{
		let UserID = parseInt(req.params.id)
		let UserFound = await Usuario.findByPk(UserID)
		if(!UserFound){
			return res.status(204).json({'message':'Nonexisted User ID'})
		}
		return res.status(200).json(UserFound)
	}catch(error){
		return res.status(204).json({'message':error})
	}
}


//3- ADMIN  permite guardar un nuevo usuario.
export async function addUser(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
		
		const userToSave = new Usuario(req.body)
		await userToSave.save()
		return res.status(200).json({'meesage': 'User added succesfully'})

	}catch(error){
		return res.status(204).json({'message': error})
	}

}

// 4- ADMIN cambiar atributo de un usuario 
export async function editUserByID(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let idUserEdit = parseInt(req.params.id)
	try{
		let userToEdit = await Usuario.findByPk(idUserEdit)
		if(!userToEdit){
			return res.status(204).json({'message':'Nonexisted User ID'})
		}
		await userToEdit.update(req.body)
		return res.status(200).json({'message': 'User Updated'})

	}catch(error){
		return res.status(204).json({'message': error})
	}
}


// 5 - ADMIN ‘/usuarios/baja/:id’ permite borrar un usuario logicamente según el id pasado en la url
export async function deleteUserByID(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let userID = parseInt(req.params.id)
	try {
		let userToDelete = await Usuario.findByPk(userID)
	
		if(!userToDelete){
			return res.status(204).json({'message': 'Nonexisted User ID'})
		}
		await userToDelete.update({ estado_usuario: false })
		return res.status(200).json({'message': 'User logical delete succesfully'})

	} catch (error) {
		return res.status(204).json({'message': error})
	}
}

