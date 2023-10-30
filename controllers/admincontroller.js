import Admin from '../models/admin.js'
import Usuario from '../models/usuario.js'

// 36 - nivel 3 ADMIN, el listado completo de admins sin baja lógica.  
export async function listAdminStateTrue(req,res){

	if(parseInt(req.nivel) === 1){return res.status(201).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(201).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allAdmin = await Admin.findAll({where:{	estado_admin: true}}) 
		return res.status(200).json(allAdmin)
	}catch(error){
		return res.status(201).json({'message': error})
	}

}

// 37- nivel 3 ADMIN, el listado completo de admins.*/
export async function listAllAdmin(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allAdmins = await Admin.findAll() 
		return res.status(200).json(allAdmins)
	}catch(error){
		return res.status(204).json({'message': error})
	}
	
}

// 38-nivel 3 ADMIN, datos de un admin en particular consignado por su número de id 
export async function listAdminByID(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	try{
		let AdminID = parseInt(req.params.id)
		let AdminFound = await Admin.findByPk(AdminID)
		if(!AdminFound){
			return res.status(204).json({'message':'Nonexisted User ID'})
		}
		return res.status(200).json(AdminFound)
	}catch(error){
		return res.status(204).json({'message':error})
	}
}


//39- ADMIN  permite guardar un nuevo admin.
export async function addAdmin(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	const idUser = parseInt(req.body.id_cliente)
	try{
		
		const user = await Usuario.findByPk(idUser)
		if(user.nivel !== 3){ return res.status(201).json({'message: ': 'User must be level 3 to assign Admins'})}
		let idAdmin = await Admin.findByPk(idUser)
		if(idAdmin){
			return res.status(204).json({'message':'Admin already exist'})
		}
		
		const adminToSave = new Admin(req.body)
		await adminToSave.save()
		return res.status(200).json({'meesage': 'Admin added succesfully'})

	}catch(error){
		return res.status(204).json({'message': error})
	}

}

// 40- ADMIN cambiar atributo de un Admin 
export async function editAdminByID(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let idAdminEdit = parseInt(req.params.id)
	try{
		let adminToEdit = await Admin.findByPk(idAdminEdit)
		if(!adminToEdit){
			return res.status(204).json({'message':'Nonexisted Admin ID'})
		}
		await adminToEdit.update(req.body)
		return res.status(200).json({'message': 'Admin Updated'})

	}catch(error){
		return res.status(204).json({'message': error})
	}
}


// 41 - ADMIN ‘/admin/baja/:id’ permite borrar un admin logicamente según el id pasado en la url
export async function deleteAdminByID(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let adminID = parseInt(req.params.id)
	try {
		let adminToDelete = await Admin.findByPk(adminID)
	
		if(!adminToDelete){
			return res.status(204).json({'message': 'Nonexisted Admin ID'})
		}
		await adminToDelete.update({ estado_admin: false })
		return res.status(200).json({'message': 'Admin logical delete succesfully'})

	} catch (error) {
		return res.status(204).json({'message': error})
	}
}
