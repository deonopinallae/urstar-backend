import { mapProduct } from './mapProduct.js'
import { mapProductInCart } from './mapProductInCart.js'
import { mapOutfit } from './mapOutfit.js'

export const mapUser = (user) => ({
	id: user.id.toString(),
	login: user.login,
	roleId: user.role,
	cart: (user.cart || []).map(mapProductInCart), 
	favorites: (user.favorites || []).map(mapProduct),
	combinerProducts: (user.combinerProducts || []).map(mapProduct),
	outfits: (user.outfits || []).map(mapOutfit),
})
