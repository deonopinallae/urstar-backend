import { Product } from '../models/index.js'

//add
export const addProduct = async (product) => {
	const newProduct = await Product.create(product)
	await newProduct.populate('reviews')
	return newProduct
}

//edit
export const editProduct = async (id, product) => {
	const newProduct = await Product.findByIdAndUpdate(id, product, {
		returnDocument: 'after',
	})
	await newProduct.populate('reviews')
	return newProduct
}

//delete
export const deleteProduct = async (id) => await Product.deleteOne({ _id: id })

//get list with search and pag
export const getProducts = async () => {
	const [products] = await Promise.all([
		Product.find({})
			.populate({
				path: 'reviews',
				populate: { path: 'author', select: 'login' },
			}),
	])

	return {
		products,
	}
}

//get item
export const getProduct = (id) =>{
	const product = Product.findById(id).populate({
		path: 'reviews',
		populate: { path: 'author', select: 'login' },
	})
	return product
}