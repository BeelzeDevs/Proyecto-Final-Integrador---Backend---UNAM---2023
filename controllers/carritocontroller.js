import Producto from '../models/producto.js'
import Existencia from '../models/existencia.js'
import Carrito from '../models/carrito.js'
import Cliente from '../models/cliente.js'

//19- Solo nivel 1, Cliente: agregar existencia al carrito 
export async function addTrolleyItem(req,res){
	if(parseInt(req.nivel)=== 3){return res.status(201).json({'message: ': 'Permision denied for admins'})}
	if(parseInt(req.nivel) === 2){return res.status(201).json({'message: ': 'Permision denied for suppliers'})}
	if(parseInt(req.body.cantidad_productos) <= 0){return res.status(201).json({'message: ': 'Product quantity less or equal to 0'})}

	try {
		let existenceID = parseInt(req.body.id_existencia)
		let verifyExistence = await Existencia.findByPk(existenceID)
		if(!verifyExistence){
			return res.status(201).json({'message: ': 'Existence not found'})
		}
		let verifyIDClient = parseInt(req.body.id_cliente)
		console.log(verifyIDClient)
		if(verifyIDClient !== req.user){
			return res.status(201).json({'message:':'User must coincidence with Client logged'})
		}
		let verifyClient = await Cliente.findByPk(verifyIDClient)
		if(!verifyClient){
			return res.status(201).json({'message: ': 'Client not found'})
		}
		if(verifyExistence.cantidad_existencia < parseInt(req.body.cantidad_productos)){
			return res.status(201).json({'message: ': 'Cant buy more than stock avaliable'})
		}
		let trolleyToSave = new Carrito(req.body)
		await trolleyToSave.save()
		return res.status(200).json({'message: ':'Existance added to trolley succesfully'})
		
		
	} catch (error) {
		return res.status(201).json({'message':error})
	}

}

//20- Solo nivel 1, Cliente: Eliminar existencia en el carrito con el id carrito pasado por parametro 
export async function deleteTrolleyItem(req,res){
	if(parseInt(req.nivel)=== 3){return res.status(204).json({'message: ': 'Permision denied for admins'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try {
		let clientID = req.user
		let trolleyID = parseInt(req.params.idCarrito)
		if(isNaN(trolleyID)){
			return res.status(204).json({'message: ': 'ID trolley should be valid integer'})
		}
		const carritoToDelete = await Carrito.findOne({
			where: { id_carrito: trolleyID, id_cliente: clientID }
		})
		if (!carritoToDelete) {
			return res.status(204).json({ 'message': 'TrolleyID and ClientID not found' })
		}

		await carritoToDelete.destroy()
		return res.status(200).json({'message: ': 'Trolley Existence Deleted'})

		
	}catch (error) {
		return res.status(204).json({'message:': 'error s'})
	}
}

//21- Solo nivel 1, Cliente: modificar la cantidad de la existencia(producto) en el carrito con el id carrito pasado por parametro 
export async function editQuantityItemByTrolleyID(req,res){
	if(parseInt(req.nivel)=== 3){return res.status(204).json({'message: ': 'Permision denied for admins'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	if(parseInt(req.body.cantidad_productos) <= 0){return res.status(204).json({'message: ': 'Product quantity less or equal to 0'})}

	try {
		let clientID = req.user
		let trolleyID = parseInt(req.params.idCarrito)
		if(isNaN(trolleyID)){
			return res.status(204).json({'message: ': 'ID trolley should be valid integer'})
		}
		
		const carritoToModCant = await Carrito.findOne({
			where: { id_carrito: trolleyID, id_cliente: clientID }
		})
		if (!carritoToModCant) {
			return res.status(204).json({ 'message': 'TrolleyID and ClientID not found' })
		}
		
		let existence = await Existencia.findByPk(carritoToModCant.id_existencia)
		let quant = parseInt(req.body.cantidad_productos)
		if(existence.cantidad_existencia < quant ){
			return res.status(204).json({'message: ': 'Cant modify with more than stock avaliable'})
		}
		
		await carritoToModCant.update({cantidad_productos:quant})
		return res.status(200).json({'message: ': 'Trolley quantity modified successfully'})

		
	}catch (error) {
		return res.status(204).json({'message:': 'error s'})
	}
}

//22- Solo nivel 1, Clientes. Listar todos los productos del carrito del Cliente 
export async function listTrolleyExistences(req,res){
	if(parseInt(req.nivel)=== 3){return res.status(204).json({'message: ': 'Permision denied for admins'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	try {
		let clientID = req.user
		
		
		const carritoToModCant = await Carrito.findAll({
			where: { id_cliente: clientID },
			include: [
				{
					model: Existencia,
					as: 'existencias', 
					attributes: ['precio'], 
					include: [
						{
							model: Producto,
							as: 'productos',
							attributes: ['descripcion'],
						},
					],
				},
			],
		})
		if (!carritoToModCant) {
			return res.status(204).json({ 'message': 'ClientID not found' })
		}
		return res.status(200).json({'message: ': carritoToModCant})

		
	}catch (error) {
		return res.status(204).json({'message:': error})
	}
}

//25 Requisito nivel 1, Cliente. Vaciar el carrito 
export async function emptyTrolley(req,res){
	if(parseInt(req.nivel) === 3){return res.status(201).json({ 'message': 'Permission denied for admins' })}
	if(parseInt(req.nivel) === 2){return res.status(201).json({'message: ': 'Permission denied for suppliers'})}

	try {
		let clientID = req.user
		const trolleyToDelete = await Carrito.findAll({
			where: { id_cliente: clientID },
		})
		if (trolleyToDelete.length === 0) {
			return res.status(201).json({ 'message': 'ClientID not found in items' })
		}

		for (const item of trolleyToDelete) {
			await item.destroy()
		}
		return res.status(201).json({ 'message': 'The trolley was successfully emptied' })
	
		
	}catch (error) {
		return res.status(201).json({'message: ': error})
	}
}