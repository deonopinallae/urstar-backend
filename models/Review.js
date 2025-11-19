import mongoose from 'mongoose'

const ReviewSchema = mongoose.Schema(
	{
		author: {
			type: String,
			required: true,
		},
		content: {
			type: String,
			required: true,
		},
		rating: {
			type: String,
			required: true,
		},
		publishedAt: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true },
)

export const Review = mongoose.model('Review', ReviewSchema)
