import { mapReview } from "./mapReview.js"

export const mapProduct = (product) => {
	return {
		id: product._id.toString(),
		imageUrl: product.imageUrl,
		name: product.name,
		brand: product.brand,
		type: product.type,
		category: product.category,
		price: product.price,
		reviews: (product.reviews || []).map(mapReview),
		description: product.description,
		size: product.size || 'no size'
	}
}
