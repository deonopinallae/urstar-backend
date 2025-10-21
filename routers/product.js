import express from 'express'
import {
	getProducts,
	getProduct,
	addProduct,
	editProduct,
	deleteProduct,
	addReview,
	removeReview,
} from '../controllers/index.js'
import { authenticated, hasRole } from '../middlewars/index.js'
import { mapProduct, mapReview } from '../helpers/index.js'
import { ROLES } from '../constants/roles.js'
import { Product } from '../models/Product.js'

export const productRouter = express.Router({ mergeParams: true })

productRouter.get('/', async (req, res) => {
	try {
		const { products } = await getProducts()
		if (products.length === 0) {
			throw new Error('products.length 0')
		}
		res.send({ data: { products: products.map(mapProduct) } })
	} catch (e) {
		console.log(e.message)
	}
})

productRouter.get('/:id', async (req, res) => {
	const product = await getProduct(req.params.id)
	res.send({ data: mapProduct(product) })
})

productRouter.post('/:id/reviews', async (req, res) => {
	const newReview = await addReview(req.params.id, {
		content: req.body.content,
		author: req.user.id,
	})

	res.send({ data: mapReview(newReview) })
})

productRouter.delete(
	'/:productId/reviews/:reviewId',
	authenticated,
	hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
	async (req, res) => {
		await removeReview(req.params.productId, req.params.reviewId)

		res.send({ error: null })
	},
)

productRouter.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newProduct = await addProduct({
		title: req.body.title,
		brand: req.body.brand,
		type: req.body.type,
		price: req.body.price,
		category: req.body.category,
		description: req.body.description,
	})

	res.send({ data: mapProduct(newProduct) })
})

productRouter.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const updatedProduct = await editProduct(req.params.id, {
		title: req.body.title,
		content: req.body.content,
		image: req.body.imageUrl,
	})

	res.send({ data: updatedProduct })
})

productRouter.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteProduct(req.params.id)
	res.send({ error: null })
})
