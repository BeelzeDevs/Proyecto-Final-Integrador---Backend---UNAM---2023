import Existencia from '../models/existencia.js'
import Producto from '../models/producto.js'
import Venta from '../models/venta.js'



//23- Dependiendo del nivel de acceso retornara uno u otro
//	  nivel 1. Clientes. Listar todos las existencias compradas (ventas para nosotros) de ese cliente
//	  nivel 2. Admin. lista todas las ventas realizadas  
export async function listSales(req,res){
    
	
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for supplier'})}
	if(parseInt(req.nivel) === 3){
		//Admin

		try {
			let salesToList = await Venta.findAll({
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
			if(!salesToList){
				return res.status(204).json({'message: ': 'Sales not found'})
			}
			return res.status(200).json(salesToList)

		} catch (error) {
			return res.status(404).json({'message: ': error})
		}
	}
	else{
		//Cliente
		try {
			let idClient = parseInt(req.user)
			let salesToList = await Venta.findAll({
				where: { id_cliente : idClient },
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
			if(!salesToList){
				return res.status(204).json({'message: ': 'ClientID not found in sales'})
			}
			return res.status(200).json({'message: ': salesToList})

		} 
		catch (error) {
			return res.status(404).json({'message: ': error})
		}
	}

}

//24- nivel 3. Admins. Listar todos las existencias vendidas de un Cliente id pasado por parametro  
export async function listSalesByIDClient(req,res){
    if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for supplier'})}

	try {
		let idClient = parseInt(req.params.idCliente)
		let salesToList = await Venta.findAll({
			where: { id_cliente : idClient },
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
		if(!salesToList){
			return res.status(204).json({'message: ': 'ClientID not found in sales'})
		}
		return res.status(200).json({'message: ': salesToList})

	} catch (error) {
		return res.status(404).json({'message: ': error})
	}
}
