import mongoose from 'mongoose'
import validator from 'validator'

const ProductSchema = mongoose.Schema(
	{
		imageUrl: {
			type: String,
			require: true
		},
		name: {
			type: String,
			require: true

		},
		brand: {
			type: String,
			require: true

		},
		type: {
			type: String,
			require: true

		},
		category: {
			type: String,
			require: true

		},
		price: {
			type: String,
			require: true

		},
		description: {
			type: String,
			require: true

		},
		reviews: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review',
		}],
		size: String
	},
	{ timestamps: true },
)

export const Product = mongoose.model('Product', ProductSchema)
