import mongoose from 'mongoose'
import { mapReview } from './mapReview.js'

export const mapProduct = (product) => {
	const reviewsToMap = product.reviews || []
	return {
		id: product.id,
		title: product.title,
		brand: product.brand,
		type: product.type,
		category: product.category,
		price: product.price,
		imageUrl: product.imageUrl,
		content: product.content,
		reviews: reviewsToMap.map((review) =>
			mongoose.isObjectIdOrHexString(review) ? review : mapReview(review)
		),
		description: product.description,
		rating: product.rating,
	}
}
