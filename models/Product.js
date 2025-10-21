import mongoose from 'mongoose'
import validator from 'validator'

const ProductSchema = mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		price: {
			type: String,
			required: true,
		},
		imageUrl: {
			type: String,
			required: true,
			validate: {
				validator: validator.isURL,
				message: 'Image should be a valid url',
			},
		},
		description: {
			type: String,
			required: true,
		},
		rating: {
			type: Number,
			required: true,
		},
		reviews: [{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Review',
		}],
	},
	{ timestamps: true },
)

export const Product = mongoose.model('Product', ProductSchema)
