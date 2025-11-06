import mongoose from 'mongoose'
import { mapProduct } from './mapProduct.js'

export const mapUser = (user) => ({
	id: user.id,
	login: user.login,
	roleId: user.role,
	cart: user.cart,
	favorites: user.favorites,
	combinerProducts: user.combinerProducts,
	outfits: user.outfits,
})