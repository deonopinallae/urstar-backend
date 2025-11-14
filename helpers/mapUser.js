export const mapUser = (user) => ({
	id: user.id.toString(),
	login: user.login,
	roleId: user.role,
	cart: [...(user.cart || [])],
	favorites: [...(user.favorites || [])],
	combinerProducts: [...(user.combinerProducts || [])],
	outfits: [...(user.outfits || [])],
})