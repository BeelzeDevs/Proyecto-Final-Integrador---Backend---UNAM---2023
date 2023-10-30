import Proveedor from '../models/proveedor.js'
import Usuario from '../models/usuario.js'

// 30 - nivel 3 ADMIN, el listado completo de proveedores sin baja lógica.  
export async function listProvStateTrue(req,res){

	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allProv = await Proveedor.findAll({where:{	estado_proveedor: true}}) 
		return res.status(200).json(allProv)
	}catch(error){
		return res.status(204).json({'message': error})
	}

}

// 31- nivel 3 ADMIN, el listado completo de proveedores.*/
export async function listAllProv(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allProv = await Proveedor.findAll() 
		return res.status(200).json(allProv)
	}catch(error){
		return res.status(204).json({'message': error})
	}
	
}

// 32-nivel 3 ADMIN, datos de un proveedor en particular consignado por su número de id 
export async function listProvByID(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	try{
		let ProvID = parseInt(req.params.id)
		let ProvFound = await Proveedor.findByPk(ProvID)
		if(!ProvFound){
			return res.status(204).json({'message':'Nonexisted Provider ID'})
		}
		return res.status(200).json(ProvFound)
	}catch(error){
		return res.status(204).json({'message':error})
	}
}


//33- ADMIN  permite guardar un nuevo prvoeedor.
export async function addProv(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	const idProv = parseInt(req.body.id_proveedor)
	try{
		const user = await Usuario.findByPk(idProv)
		if(user.nivel !== 2){ return res.status(201).json({'message: ': 'User must be level 2 to assign provider'})}
		
		let isProv = await Proveedor.findByPk(idProv)
		if(isProv){
			return res.status(204).json({'message':'Provider already exist'})
		}

		const provToSave = new Proveedor(req.body)
		await provToSave.save()
		return res.status(200).json({'meesage': 'Provider added succesfully'})

	}catch(error){
		return res.status(204).json({'message': error})
	}

}

// 34- ADMIN cambiar atributo de un proveedor 
export async function editProvByID(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let idProvEdit = parseInt(req.params.id)
	try{
		let provToEdit = await Proveedor.findByPk(idProvEdit)
		if(!provToEdit){
			return res.status(204).json({'message':'Nonexisted Provider ID'})
		}
		await provToEdit.update(req.body)
		return res.status(200).json({'message': 'Provider Updated'})

	}catch(error){
		return res.status(204).json({'message': error})
	}
}


// 35 - ADMIN ‘/proveedor/baja/:id’ permite borrar un proveedor logicamente según el id pasado en la url
export async function deleteProvByID(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let provID = parseInt(req.params.id)
	try {
		let provToDelete = await Proveedor.findByPk(provID)
	
		if(!provToDelete){
			return res.status(204).json({'message': 'Nonexisted Provider ID'})
		}
		await provToDelete.update({ estado_proveedor: false })
		return res.status(200).json({'message': 'Provider logical delete succesfully'})

	} catch (error) {
		return res.status(204).json({'message': error})
	}
}

