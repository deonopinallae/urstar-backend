export const mapProductInCart = (cartItem) => ({
	id: cartItem.product._id.toString(),
	imageUrl: cartItem.product.imageUrl,
	name: cartItem.product.name,
	price: cartItem.product.price,
	size: cartItem.size,
});
