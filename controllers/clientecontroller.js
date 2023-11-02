import Cliente from '../models/cliente.js'
import Usuario from '../models/usuario.js'


//26- Requisito nivel 3, Admin. permite obtener el teléfono de un usuario que se indica por id. En caso de ser cliente, solo puede obtener el telefono del usuario logeado
export async function getUserTelByID(req,res){
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let clientID = parseInt(req.params.id)

	if(parseInt(req.nivel) === 1){
		if(clientID !== req.user){return res.status(204).json({'message: ': 'Permision denied for Clients, you could only get your number'})}
	}

	try{
		let clientToGetTel = await Cliente.findByPk(clientID)
		if(clientToGetTel){
			return res.status(200).json({'Client number' :clientToGetTel.telefono_cliente})
		}
		else{
			return res.status(204).json({'message' : 'Client not found'})
		}
	} catch(error){
		
		return res.status(204).json({'message':error})
	}

}

//27- Requisito nivel 3, Admin. permite obtener el nombre de un usuario que se indica por id. En caso de ser cliente, solo puede agregar su id de la entidad usuario
export async function getUserNameByID(req,res){
	
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	let clientID = parseInt(req.params.id)

	if(parseInt(req.nivel) === 1){
		if(clientID !== req.user){return res.status(201).json({'message: ': 'Permision denied for Clients, you could only get your username'})}
	}

	try{
		
		let clientToGetName = await Cliente.findByPk(clientID)
		if(clientToGetName){
			return res.status(200).json({'User name' : clientToGetName.nombre_cliente})
		}
		else{
			return res.status(204).json({'message' : 'user not found'})
		}

	}catch(error){
	
		return res.status(204).json({'message':error})
	}
}
//29- Requisito nivel 3, Admin. permite agregar un cliente. En caso de ser cliente, solo puede agregarse a la entidad cliente si el ID corresponde al Usuario
export async function addClient(req,res){
	
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for Providers'})}
	
	const idUser = parseInt(req.body.id_cliente)
	
	if(parseInt(req.nivel) === 1){
		if(idUser !== req.user){return res.status(204).json({'message: ': 'Permision denied for Clients, you could only add your userID to client'})}
	}

	try {
		const user = await Usuario.findByPk(idUser)
		if(user.nivel !== 1){ return res.status(204).json({'message: ': 'User must be level 1 to assign Clients'})}

		let idClient = await Cliente.findByPk(req.body.id_cliente)
		if(idClient){
			return res.status(204).json({'message':'Client already exist'})
		}
			
		const clientToSave = new Cliente(req.body) 
		await clientToSave.save()
		return res.status(200).json({'message': 'Client added succesfully'})
		
		
	} catch (error) {
		return res.status(204).json({'message': error})
	}

} 

// 42 - nivel 3 ADMIN, el listado completo de clientes sin baja lógica.  
export async function listClientStateTrue(req,res){

	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allClient = await Cliente.findAll({where:{ estado_cliente: true}}) 
		return res.status(200).json(allClient)
	}catch(error){
		return res.status(204).json({'message': error})
	}

}

// 42 nivel 3 ADMIN, el listado completo de clientes.*/
export async function listAllClient(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allClient = await Cliente.findAll() 
		return res.status(200).json(allClient)
	}catch(error){
		return res.status(204).json({'message': error})
	}
	
}

// 43 nivel 3 ADMIN, datos de un cliente en particular consignado por su número de id 
export async function listClientByID(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	try{
		let clientID = parseInt(req.params.id)
		let ClientFound = await Cliente.findByPk(clientID)
		if(!ClientFound){
			return res.status(204).json({'message':'Nonexisted Client ID'})
		}
		return res.status(200).json(ClientFound)
	}catch(error){
		return res.status(204).json({'message':error})
	}
}


// 44 ADMIN cambiar atributo de un cliente. En caso de ser cliente, solo puede modificar con su ID de cliente correspondiente al Usuario
export async function editClientByID(req,res){

	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let idClientEdit = parseInt(req.params.id)
	if(parseInt(req.nivel) === 1){
		if(idClientEdit !== req.user){return res.status(204).json({'message: ': 'Permision denied for Clients, you could only edit your client ID'})}
	}

	try{
		let clientToEdit = await Cliente.findByPk(idClientEdit)
		if(!clientToEdit){
			return res.status(204).json({'message':'Nonexisted Client ID'})
		}
		await clientToEdit.update(req.body)
		return res.status(200).json({'message': 'Client Updated'})

	}catch(error){
		return res.status(204).json({'message': error})
	}
}


// 45 ADMIN ‘/admin/baja/:id’ permite borrar un cliente logicamente según el id pasado en la url
export async function deleteClientByID(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let clientID = parseInt(req.params.id)
	try {
		let clientToDelete = await Cliente.findByPk(clientID)
	
		if(!clientToDelete){
			return res.status(204).json({'message': 'Nonexisted Client ID'})
		}
		await clientToDelete.update({ estado_cliente: false })
		return res.status(200).json({'message': 'Client logical delete succesfully'})

	} catch (error) {
		return res.status(204).json({'message': error})
	}
}
