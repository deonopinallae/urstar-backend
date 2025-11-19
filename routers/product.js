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

export const productRouter = express.Router({ mergeParams: true })

productRouter.get('/', async (req, res) => {
	try {
		const { products } = await getProducts()
		if (products.length === 0) {
			throw new Error('no products')
		}
		res.send({ data: { products: products.map(product => mapProduct(product)) } })
	} catch (e) {
		console.log(e.message)
	}
})

productRouter.get('/:id', async (req, res) => {
	const product = await getProduct(req.params.id).populate('reviews')
	res.send({ data: mapProduct(product) })
})

productRouter.post('/:id/reviews', async (req, res) => {
	const newReview = await addReview(req.params.id, {
		author: req.body.userLogin,
		rating: req.body.rating,
		content: req.body.reviewValue,
		publishedAt: req.body.reviewDate
	})

	res.send({ review: mapReview(newReview) })
})

productRouter.delete(
  '/:productId/reviews/:reviewId',
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const deletedReviewId = await removeReview(
      req.params.productId,
      req.params.reviewId
    )

    res.send({ deletedReviewId })
  }
)


productRouter.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newProduct = await addProduct({
		imageUrl: req.body.imageUrl,
		title: req.body.title,
		brand: req.body.brand,
		type: req.body.type,
		price: req.body.price,
		category: req.body.category,
		description: req.body.description,
	})

	res.send({ data: mapProduct(newProduct) })
})

productRouter.patch('/:id/edit', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const updatedProduct = await editProduct(req.params.id, {
		imageUrl: req.body.imageUrl,
		name: req.body.name,
		brand: req.body.brand,
		price: req.body.price,
		type: req.body.type,
		category: req.body.category,
		description: req.body.description,
	})

	res.send({ data: updatedProduct })
})

productRouter.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteProduct(req.params.id)
	res.send({ error: null })
})
