import { Product } from '../models'


//add
export const addProduct = async (product) => {
	const newProduct = await Product.create(product)
	await newProduct.populate({ path: 'reviews', populate: 'author' })
	return newProduct
}


//edit
export const editProduct = async (id, product) => {
	const newProduct = await Product.findByIdAndUpdate(id, product, {
		returnDocument: 'after',
	})
	await newProduct.populate({ path: 'reviews', populate: 'author' })
	return newProduct
}


//delete
export const deleteProduct = (id) => Product.deleteOne({ _id: id })


//get list with search and pag
export const getProducts = async (search = '', limit = 10, page = 1) => {
	const [products, count] = await Promise.all([
		Product.find({ title: { $regex: search, $options: 'i' } })
			.limit(limit)
			.skip((page - 1) * limit)
			.sort({ createdAt: -1 }),
		Product.countDocuments({ title: { $regex: search, $options: 'i' } }),
	])

	return {
		products,
		lastPage: Math.ceil(count / limit),
	}
}


//get item
export const getProduct = (id) =>
	Product.findById(id).populate({ path: "reviews", populate: {path: "author", select: "login"} })
