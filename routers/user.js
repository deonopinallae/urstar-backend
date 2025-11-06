import express from 'express'
import {
	getUsers,
	getRoles,
	updateUser,
	deleteUser,
	addProductToCombiner,
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

//get reviews
// userRouter.get('/:id', authenticated, hasRole([ROLES.ADMIN, ROLES.USER]), async (req, res) => {
//   const newComment = await addComment(req.params.id, {
//     content: req.body.content,
//     author: req.user.id
//   })

//   res.send({data: mapComment(newComment)})
// })

//add product to cart
userRouter.post('/:id/cart', authenticated, async (req, res) => {
	const updatedCart = await addProductInCart(req.params.id, req.body.productData)
	res.send({ data: mapUser(updatedCart) })
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

//get product combiner
userRouter.get('/:id/combiner', authenticated, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate('combinerProducts')
		res.send({ data: user.combinerProducts })
	} catch (error) {
		console.log(error)
	}
})

//get user
userRouter.get('/:id', authenticated, async (req, res) => {
	try {
		const user = await User.findById(req.params.id).populate('combinerProducts')
		res.send({ data: mapUser(user) })
	} catch (error) {
		console.log(error)
	}
})
