import Cliente from '../models/cliente.js'
import Usuario from '../models/usuario.js'


//26- Requisito nivel 3, Admin. permite obtener el teléfono de un usuario que se indica por id. 
export async function getUserTelByID(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let clientID = parseInt(req.params.id)
	
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


//27- Requisito nivel 3, Admin. permite obtener el nombre de un usuario que se indica por id. 
export async function getUserNameByID(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	try{
		let clientID = parseInt(req.params.id)
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
//29- Requisito nivel 3, Admin. permite agregar un cliente.
export async function addClient(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for Clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for Providers'})}
	
	try {
		const idUser = parseInt(req.body.id_cliente)
		const user = await Usuario.findByPk(idUser)
		if(user.nivel !== 1){ return res.status(201).json({'message: ': 'User must be level 1 to assign Clients'})}

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

	if(parseInt(req.nivel) === 1){return res.status(201).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(201).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allClient = await Cliente.findAll({where:{ estado_cliente: true}}) 
		return res.status(200).json(allClient)
	}catch(error){
		return res.status(201).json({'message': error})
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


// 44 ADMIN cambiar atributo de un cliente 
export async function editClientByID(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let idClientEdit = parseInt(req.params.id)
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
