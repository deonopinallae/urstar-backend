export const mapUser = (user) => ({
	id: user.id,
	login: user.login,
	roleId: user.role,
	registeredAt: user.registeredAt,
	cart: user.cart,
	favorites: user.favorites,
	combinerProducts: user.combinerProducts,
	outfits: user.outfits,
})
