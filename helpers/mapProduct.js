import mongoose from 'mongoose'
import { mapReview } from './mapReview.js'

export const mapProduct = (product) => {
	return {
		id: product.id,
		imageUrl: product.imageUrl,
		name: product.name,
		brand: product.brand,
		type: product.type,
		category: product.category,
		price: product.price,
		content: product.content,
		reviews: (product.reviews.map((review) =>
			mongoose.isObjectIdOrHexString(review) ? review : mapReview(review)) || []
		),
		description: product.description,
	}
}
