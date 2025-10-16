import express from 'express'
import {
	getProducts,
	getProduct,
	addProduct,
	editProduct,
	deleteProduct,
	addReview,
	removeReview,
} from '../controllers'
import { authenticated, hasRole } from '../middlewars'
import { mapProduct, mapReview } from '../helpers'
import { ROLES } from '../constants/roles.js'

export const productRouter = express.Router({ mergeParams: true })

productRouter.get('/', async (req, res) => {
	const { products, lastPage } = await getProducts(
		req.query.search,
		req.query.limit,
		req.query.page,
	)
	res.send({ data: { products: products.map(mapProduct), lastPage } })
})

productRouter.get('/:id', async (req, res) => {
	const product = await getProduct(req.params.id)
	res.send({ data: mapProduct(product) })
})

productRouter.post('/:id/reviews', authenticated, async (req, res) => {
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
