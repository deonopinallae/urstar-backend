import bcrypt from 'bcrypt'
import { ROLES } from '../constants/roles.js'
import { User } from '../models/index.js'
import { generateToken, mapUser } from '../helpers/index.js'

//register
export const register = async (login, password, registeredAt) => {
	if (!password) {
		throw new Error('passwors is empty')
	}
	const passwordHash = await bcrypt.hash(password, 10)
	const user = await User.create({ login, password: passwordHash, registeredAt})
	const token = generateToken({ id: user.id })

	return { user, token }
}

//login
export const login = async (login, password) => {
	const user = await User.findOne({ login })

	if (!user) {
		throw new Error('user not found')
	}

	const isPasswordMatch = await bcrypt.compare(password, user.password)

	if (!isPasswordMatch) {
		throw new Error('wrong password')
	}

	const token = generateToken({ id: user.id })
	return { token, user: mapUser(user) }
}

//get users
export const getUsers = () => {
	return User.find()
}

//get user
export const getUser = (userId) => {
	return User.findById(userId)
}

//get roles
export const getRoles = () => {
	return [
		{ id: ROLES.ADMIN, name: 'admin' },
		{ id: ROLES.USER, name: 'user' },
		{ id: ROLES.GUEST, name: 'guest' },
	]
}

//delete
export const deleteUser = (id) => {
	return User.deleteOne({ _id: id })
}

//edit (roles)
export const updateUser = (id, userData) => {
	return User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })
}

//get user products in cart
export const getUserCart = (userId) => {
	const user = User.findById(userId)
	console.log(user.inCart)
	return user.inCart 
}

//add product to cart
export const addProductInCart = async(userId, productData) => {
	await User.findByIdAndUpdate(userId, {$push: {inCart: productData}})
	return productData
}

//add product to combiner
export const addProductToCombiner = async(userId, productData) => {
	const updatedUser = await User.findByIdAndUpdate(
	userId,
	{ $push: { combinerProducts: productData } },
	{ new: true }
)

	return updatedUser
}