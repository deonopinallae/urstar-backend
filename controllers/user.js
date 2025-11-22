import bcrypt from 'bcrypt'
import { ROLES } from '../constants/roles.js'
import { Product, User, Outfit } from '../models/index.js'
import {
	generateToken,
	mapOutfit,
	mapProduct,
	mapUser,
	mapProductInCart,
} from '../helpers/index.js'
import mongoose from 'mongoose'

//register
export const register = async (login, password, registeredAt) => {
	if (!password) {
		throw new Error('passwors is empty')
	}
	const passwordHash = await bcrypt.hash(password, 10)
	const user = await User.create({ login, password: passwordHash, registeredAt })
	const token = generateToken({ id: user.id })

	return { user, token }
}

//login
export const login = async (login, password) => {
	const user = await User.findOne({ login })
		.populate('combinerProducts')
		.populate('outfits')
		.populate('cart')
		.populate('favorites')

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

//add product to combiner
export const addProductToCombiner = async (userId, productId) => {
	const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)
	if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
		throw new Error('invalid userId or productId')
	}
	const product = await Product.findById(productId)
	if (!product) throw new Error('product not found')

	await User.findByIdAndUpdate(
		userId,
		{ $addToSet: { combinerProducts: productId } },
		{ new: true },
	).populate('combinerProducts')
	return mapProduct(product)
}

//remove product from combiner
export const removeProductFromCombiner = async (userId, productId) => {
	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ $pull: { combinerProducts: productId } },
		{ new: true },
	).populate('combinerProducts')

	if (!updatedUser) throw new Error('User not found')
	return mapUser(updatedUser)
}

//save outfit
export const saveOutfit = async (userId, outfitData) => {
	const newOutfit = await Outfit.create({
		name: outfitData.name,
		scene: outfitData.scene,
		products: outfitData.products,
		owner: userId,
	})

	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ $addToSet: { outfits: newOutfit.id } },
		{ new: true },
	).populate('outfits')

	if (!updatedUser) throw new Error('User not found')

	return mapOutfit(newOutfit)
}

//add product to favorites
export const addProductToFavorites = async (userId, productId) => {
	const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)
	if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
		throw new Error('invalid userId or productId')
	}
	const product = await Product.findById(productId)
	if (!product) throw new Error('Product not found')

	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ $addToSet: { favorites: productId } },
		{ new: true },
	).populate('favorites')

	if (!updatedUser) throw new Error('User not found')

	return mapProduct(product)
}

//remove product from favorites
export const removeProductFromFavorites = async (userId, productId) => {
	const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id)
	if (!isValidObjectId(userId) || !isValidObjectId(productId)) {
		throw new Error('invalid userId or productId')
	}
	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ $pull: { favorites: productId } },
		{ new: true },
	).populate('favorites')

	if (!updatedUser) throw new Error('User not found')
	return mapUser(updatedUser)
}

//delete outfit
export const deleteOutfit = async (userId, outfitId) => {
	const updatedUser = await User.findByIdAndUpdate(
		userId,
		{ $pull: { outfits: outfitId } },
		{ new: true },
	).populate('outfits')

	if (!updatedUser) throw new Error('user not found')

	await Outfit.findByIdAndDelete(outfitId)
}

//add product to cart
export const addProductToCart = async (userId, productData) => {
	const product = await Product.findById(productData.product)
	if (!product) throw new Error('product not found')

	const user = await User.findByIdAndUpdate(
		userId,
		{ $addToSet: { cart: { product: product._id, size: productData.size } } },
		{ new: true },
	).populate('cart.product')

	if (!user) throw new Error('user not found')

	return {
		...mapProduct(product),
		size: productData.size,
	}
}

//remove product from cart
export const removeProductFromCart = async (userId, productId, size) => {
	await User.findByIdAndUpdate(
		userId,
		{ $pull: { cart: { product: productId, size } } },
		{ new: true },
	)
} 