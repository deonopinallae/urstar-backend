import { mapProduct } from "./mapProduct.js";

export const mapUser = (user) => ({
	id: user.id.toString(),
	login: user.login,
	roleId: user.role,
	cart: [...(user.cart || [])],
	favorites: (user.favorites || []).map(mapProduct),
	combinerProducts: (user.combinerProducts || []).map(mapProduct),
	outfits: [...(user.outfits || [])],
})