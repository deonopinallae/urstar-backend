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
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import { v2 as cloudinary } from 'cloudinary'
import multer from 'multer'

export const productRouter = express.Router({ mergeParams: true })

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_API_KEY,
	api_secret: process.env.CLOUD_API_SECRET,
})

const storage = new CloudinaryStorage({
	cloudinary,
	params: { folder: 'products', allowed_formats: ['jpg', 'jpeg', 'png', 'webp'] },
})
const cloudUpload = multer({ storage })

productRouter.get('/', async (req, res) => {
	try {
		const { products } = await getProducts()
		if (!products.length) throw new Error('no products')
		res.send({ data: { products: products.map(mapProduct) } })
	} catch (e) {
		res.status(500).send({ error: e.message })
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
		publishedAt: req.body.reviewDate,
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
			req.params.reviewId,
		)
		res.send({ deletedReviewId })
	},
)

productRouter.post(
	'/add-product',
	authenticated,
	hasRole([ROLES.ADMIN]),
	cloudUpload.single('image'),
	async (req, res) => {
		if (!req.file) return res.status(400).send({ error: 'Image is required' })
		const newProduct = await addProduct({
			imageUrl: req.file.path,
			name: req.body.name,
			brand: req.body.brand,
			price: req.body.price,
			type: req.body.type,
			category: req.body.category,
			description: req.body.description,
		})
		res.send({ data: mapProduct(newProduct) })
	},
)

productRouter.patch(
	'/:id/edit',
	authenticated,
	hasRole([ROLES.ADMIN]),
	cloudUpload.single('image'),
	async (req, res) => {
		try {
			const updateData = {
				...req.body,
				imageUrl: req.file ? req.file.path : req.body.imageUrl,
			}
			const updatedProduct = await editProduct(req.params.id, updateData)
			res.json({ data: mapProduct(updatedProduct) }) // обязательно возвращать JSON
		} catch (e) {
			res.status(500).json({ error: e.message })
		}
	},
)

productRouter.delete('/:id', authenticated, async (req, res) => {
	await deleteProduct(req.params.id)
	res.send({ error: null })
})
