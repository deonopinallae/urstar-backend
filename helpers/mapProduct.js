import mongoose from 'mongoose'
import { mapReview } from './mapReview'

export const mapProduct = (product) => {
	const reviewsToMap = product.reviews || []
	return {
		id: product.id,
		title: product.title,
		brand: product.brand,
		type: product.type,
		price: product.price,
		imageUrl: product.image,
		content: product.content,
		reviews: reviewsToMap.map((review) =>
			mongoose.isObjectIdOrHexString(review) ? review : mapReview(review)
		),
		description: product.description,
		rating: product.rating,
	}
}
