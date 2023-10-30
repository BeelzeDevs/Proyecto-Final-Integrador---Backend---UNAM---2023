import Existencia from '../models/existencia.js'
import Proveedor from '../models/proveedor.js'
import Producto from '../models/producto.js'

//12- nivel 2 y nivel 3, PROVEEDOR/ADMIN, agregar existencia 
export async function addExistence(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.body.cantidad_existencia) <= 0){ return res.status(204).json({'message':'Stock cant be less or equal than 0'})}
	
	try {
		let idProv = await Proveedor.findByPk(req.body.id_proveedor)
		if(!idProv){
			return res.status(204).json({'message':'Provider not found'})
		}
		let idProd = await Producto.findByPk(req.body.id_producto)
		if(!idProd){
			return res.status(204).json({'message':'Product not found'})
		}
		const existToSave = new Existencia(req.body) 
		await existToSave.save()
		return res.status(200).json({'message': 'Existence added succesfully'})
		
	} catch (error) {
		return res.status(204).json({'message': error})
	}
}


//13-  nivel 2 y nivel 3, PROVEEDOR/ADMIN, modificar existencia con id como parametro
export async function modExistenceByID(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.body.cantidad_existencia) <= 0){ return res.status(204).json({'message':'Stock cant be less or equal than 0'})}
	if(parseInt(req.body.precio) <= 0){ return res.status(204).json({'message':'Price cant be less or equal than 0'})}
	let idExistence = parseInt(req.params.id)

	try {
		let existenceToEdit = await Existencia.findByPk(idExistence)
		if(!existenceToEdit){
			return res.status(204).json({'message:':'Existence not found'})
		}
		if(!existenceToEdit.estado_existencia & parseInt(req.nivel) == 2){
			return res.status(204).json({'message: ': 'Existence state false, cant be change'})
		}
		let idProv = await Proveedor.findByPk(req.body.id_proveedor)
		if(!idProv){
			return res.status(204).json({'message':'Provider not found'})
		}
		let idProd = await Producto.findByPk(req.body.id_producto)
		if(!idProd){
			return res.status(204).json({'message':'Product not found'})
		}
		await existenceToEdit.update(req.body) 
		return res.status(200).json({'message': 'Existence modified succesfully'})
		
	} catch (error) {
		return res.status(204).json({'message': error})
	}
}

//14- PROVEEDOR/ADMIN dar de baja lógica existencia por un id pasado por parametro
export async function deleteExistenceByID(req,res){
	if(parseInt(req.nivel)=== 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	let existenceID = parseInt(req.params.id)
	try {
		let existenceToDelete = await Existencia.findByPk(existenceID)
		if(!existenceToDelete){
			return res.status(204).json({'message:':'Existence not found'})
		}

		await existenceToDelete.update({estado_existencia:false})
		return res.status(200).json({'message: ': 'Existance deleted succesfully'})

	} catch (error) {
		return res.status(204).json({'message: ': error})
	}
}


//15- ADMIN dar de alta lógica existencia por un id pasado por parametro
export async function editExistenceStateTrueByID(req,res){
	if(parseInt(req.nivel)=== 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let existenceID = parseInt(req.params.id)
	try {
		let existenceToDelete = await Existencia.findByPk(existenceID)
		if(!existenceToDelete){
			return res.status(204).json({'message:':'Existence not found'})
		}

		await existenceToDelete.update({estado_existencia:true})
		return res.status(200).json({'message: ': 'Existance state change succesfully'})

	} catch (error) {
		return res.status(204).json({'message: ': error})
	}

}

//16- PROVEEDOR/ADMIN Listar todas las existencias con estado true
export async function listExistencesStateTrue(req,res){
	if(parseInt(req.nivel)=== 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}

	try {
		let existences = await Existencia.findAll({where:{estado_existencia:true}})
		if(!existences){
			return res.status(204).json({'message:': 'No existences found'})
		}

		return res.status(200).json(existences)
	} catch (error) {
		return res.status(204).json({'message:': error})
	}
}

//17- Admin: Cambiar el precio de una existencia que se indica por id 
export async function editExistencePriceByID(req,res){
	if(parseInt(req.nivel)=== 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	console.log(parseInt(req.nivel))
	if(parseInt(req.body.precio) <= 0){ return res.status(204).json({'message: ':'Price cant be less or equal than 0'})}
	
	try{
		let existenceID = parseInt(req.params.id)
		let existenceToChangePrice = await Existencia.findByPk(existenceID)
		if(!existenceToChangePrice){
			return res.status(204).json({'message: ' : 'Existence product not found'})
		}
		const price = parseFloat(req.body.precio)
		await existenceToChangePrice.update({precio: price})
		return res.status(200).json({'message: ': 'Existence price updated' }) 		
	}
	catch(error){
	
		return res.status(204).json({'message':error})
	}
}

//18- Cliente,Proveedor,Admin: obtener el precio de un producto que se indica por id. 
export async function getExistencePriceByID(req,res){
	try{
		let existenceID = parseInt(req.params.id)
		let existenceToGetPrice = await Existencia.findByPk(existenceID)
		if(existenceToGetPrice){
			return res.status(200).json({'Existence price' : existenceToGetPrice.precio}) // los precios los tengo en las existencias, el producto no posee precio hasta crear una existencia (existencia = producto + proveedor)
		}else{
			return res.status(204).json({'message' : 'Existence product not found'})
		}
	}catch(error){
	
		return res.status(204).json({'message':error})
	}
}

/*28- Requisito nivel 3,Admin. Permite obtener el total del stock actual de productos, la sumatoria de los
precios individuales. */
export async function getTotalStockPrice(req,res){
	
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	try {
		// Sumar los precios individuales de todos los productos
		const existencias = await Existencia.findAll()
		const totalStock = existencias.reduce((total,existencias)=> {
			const precio = parseFloat(existencias.precio)
			return total + precio
		},0)
	
		return res.status(200).json({ 'Total Stock Price': totalStock })
	}
	catch (error) {
		return res.status(204).json({ 'message': error })
	}
}