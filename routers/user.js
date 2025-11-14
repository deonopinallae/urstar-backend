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
} from '../controllers/index.js'
import { authenticated, hasRole } from '../middlewars/index.js'
import { mapUser } from '../helpers/index.js'
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

//add product to combiner
userRouter.post('/:id/combiner', async (req, res) => {
	try {
		const { productId } = req.body
		const userId = req.params.id
		const product = await addProductToCombiner(userId, productId)

		res.status(200).json(product)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: error.message })
	}
})

//get products combiner
userRouter.get('/:id/combiner', authenticated, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate('combinerProducts')
		res.send({ data: user.combinerProducts })
	} catch (error) {
		console.log(error)
	}
})

//delete product combiner
userRouter.delete('/:id/combiner/:productId', authenticated, async (req, res) => {
	try {
		const userId = req.params.id
		const productId = req.params.productId
		const updatedUser = await removeProductFromCombiner(userId, productId)

		res.send({ data: updatedUser.combinerProducts })
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

//delete product combiner
userRouter.delete('/:id/outfits/:outfitId', authenticated, async (req, res) => {
	try {
		const userId = req.params.id
		const outfitId = req.params.outfitId
		const updatedUser = await deleteOutfit(userId, outfitId)

		res.send({ data: updatedUser.outfits })
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

//get user
userRouter.get('/:id', authenticated, async (req, res) => {
	try {
		const user = await User.findById(req.params.id)
			.populate('combinerProducts')
			.populate('outfits')
			.populate('cart')
			.populate('favorites')
		res.send({ data: mapUser(user) })
	} catch (error) {
		console.log(error)
	}
})
