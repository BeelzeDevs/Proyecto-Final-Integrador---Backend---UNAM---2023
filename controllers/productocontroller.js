import Producto from '../models/producto.js'
import Marca from '../models/marca.js'
import tipoProducto from '../models/tipoProducto.js'

// 6 - nivel 3 ADMIN, ‘/producto/baja/:id’ permite borrar un producto logicamente según el id pasado en la url
export async function deleteProductByID(req,res){
	
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	let productID = parseInt(req.params.id)
	try {
		let productToDelete = await Producto.findByPk(productID)
	
		if(!productToDelete){
			return res.status(204).json({'message': 'Nonexisted Product ID'})
		}
		await productToDelete.update({ estado_producto: false })
		return res.status(200).json({'message': 'Product logical delete succesfully'})

	} catch (error) {
		return res.status(204).json({'message': error})
	}
}

//7- nivel 3 ADMIN, el listado completo de productos.*/
export async function listProducts(req,res){
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}
	
	try{
        
		let allProducts = await Producto.findAll() 
		return res.status(200).json(allProducts)
	}catch(error){
		return res.status(204).json({'message': error})
	}
}

// 8- ADMIN O PROVEEDOR el listado completo de productos sin baja lógica.
export async function listProductsStateTrue(req,res){
    
	if(parseInt(req.nivel) === 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	
	try{
        
		let allProducts = await Producto.findAll({where:{estado_producto:true}})
		return res.status(200).json(allProducts)
	}catch(error){
		return res.status(204).json({'message': error})
	}
}

//9- Todos los niveles el nombre de un producto que se indica por id.
export async function listProductsByID(req,res){

	try{
		let productID = parseInt(req.params.id)
		let productToGetName = await Producto.findByPk(productID)
		if(productToGetName){
			return res.status(200).json({'Product name' : productToGetName.nombre_producto})
		}
		else{
			return res.status(204).json({'message' : 'product not found'})
		}
	}catch(error){
	
		return res.status(204).json({'message':error})
	}
}


// 10- Todos los niveles la descripcion de un producto que se indica por id. 
export async function productsDescByID (req,res){
    
	try{
		let productID = parseInt(req.params.id)
		let productToGetDesc = await Producto.findByPk(productID)
		if(productToGetDesc){
			return res.status(200).json({'Product description' : productToGetDesc.descripcion})
		}
		else{
			return res.status(204).json({'message' : 'product not found'})
		}
	}catch(error){
	
		return res.status(204).json({'message':error})
	}
}


//11- SOLO ADMIN: agregar un producto 
export async function addProducts(req,res){
	if(parseInt(req.nivel)=== 1){return res.status(204).json({'message: ': 'Permision denied for clients'})}
	if(parseInt(req.nivel) === 2){return res.status(204).json({'message: ': 'Permision denied for suppliers'})}

	try{
		let idtypeProduct = await tipoProducto.findByPk(req.body.id_tipo_producto)
		if(!idtypeProduct){
			return res.status(204).json({'message: ':'Product Type ID not found'})
		}
		let productBrand = await Marca.findByPk(req.body.id_marca)
		if(!productBrand){
			return res.status(204).json({'message: ':'Product brand ID not found'})
		}

		let productToAdd = new Producto(req.body)
		await productToAdd.save()
		return res.status(201).json({'message': 'Product added succesfully'})
	}catch(error){
	
		return res.status(204).json({'message':error})
	}
}