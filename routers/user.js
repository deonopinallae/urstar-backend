import express from 'express'
import {
	getUsers,
	getRoles,
	updateUser,
	deleteUser,
	addProductToCombiner,
	removeProductFromCombiner,
	saveOutfit,
	deleteOutfit,
	addProductToFavorites,
	removeProductFromFavorites,
	addProductToCart,
	removeProductFromCart,
} from '../controllers/index.js'
import { authenticated, hasRole } from '../middlewars/index.js'
import { mapOutfit, mapProduct, mapUser } from '../helpers/index.js'
import { ROLES } from '../constants/roles.js'
import { User } from '../models/User.js'

export const userRouter = express.Router({ mergeParams: true })

//get users
userRouter.get('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const users = await getUsers()

	res.send({ data: users.map(mapUser) })
})

//get roles
userRouter.get('/roles', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const roles = getRoles()

	res.send({ data: roles })
})

//add product to combiner
userRouter.post('/:id/combiner', async (req, res) => {
	try {
		const { productId } = req.body
		const userId = req.params.id
		const product = await addProductToCombiner(userId, productId)

		res.send({ product })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//get products from combiner
userRouter.get('/:id/combiner', authenticated, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate('combinerProducts')
		const combinerProducts = user.combinerProducts.map((p) => mapProduct(p))
		res.send({ data: combinerProducts })
	} catch (error) {
		console.log(error)
	}
})

//remove product from combiner
userRouter.delete('/:id/combiner/:productId', authenticated, async (req, res) => {
	try {
		const userId = req.params.id
		const productId = req.params.productId
		await removeProductFromCombiner(userId, productId)

		res.send({ productId })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//add product to favorites
userRouter.post('/:id/favorites', async (req, res) => {
	try {
		const { productId } = req.body
		const userId = req.params.id
		const product = await addProductToFavorites(userId, productId)

		res.send({ product })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//remove product from favorites
userRouter.delete('/:id/favorites/:productId', authenticated, async (req, res) => {
	try {
		const userId = req.params.id
		const productId = req.params.productId
		await removeProductFromFavorites(userId, productId)

		res.send({ productId })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//save outfit
userRouter.post('/:id/outfits', authenticated, async (req, res) => {
	try {
		const { outfitData } = req.body
		const userId = req.params.id
		const outfit = await saveOutfit(userId, outfitData)

		res.send({ outfit })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//set outfits
userRouter.get('/:id/outfits', authenticated, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate('outfits')

		res.send({ data: user.outfits })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

// get outfit
userRouter.get('/:id/outfits/:outfitId', authenticated, async (req, res) => {
	try {
		const userId = req.params.id
		const outfitId = req.params.outfitId

		const user = await User.findById(userId).populate('outfits')
		if (!user) throw new Error('User not found')

		const outfit = user.outfits.find((o) => o.id.toString() === outfitId)
		if (!outfit) throw new Error('Outfit not found')
		res.send({ data: mapOutfit(outfit) })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//delete outfit
userRouter.delete('/:id/outfits/:outfitId', authenticated, async (req, res) => {
	try {
		const userId = req.params.id
		const outfitId = req.params.outfitId
		await deleteOutfit(userId, outfitId)

		res.send({ outfitId })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//remove product from cart
userRouter.delete('/:id/cart/:productId', authenticated, async (req, res) => {
	try {
		const userId = req.params.id
		const productId = req.params.productId
		const { size } = req.body

		await removeProductFromCart(userId, productId, size)
		res.send({ productId, size })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//add product to cart
userRouter.post('/:id/cart', authenticated, async (req, res) => {
	try {
		const { productData } = req.body
		const userId = req.params.id
		const addedProduct = await addProductToCart(userId, productData)

		res.send({ addedProduct })
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//get user
userRouter.get('/:id', authenticated, async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
			.populate('combinerProducts')
			.populate('outfits')
			.populate('cart.product')
			.populate('favorites')
		res.send({ data: mapUser(user) })
	} catch (error) {
		console.log(error)
	}
})

//change user role
userRouter.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newUser = await updateUser(req.params.id, {
		role: req.body.roleId,
	})

	res.send({ data: mapUser(newUser) })
})

//delete user
userRouter.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteUser(req.params.id)
	res.send({ error: null })
})
