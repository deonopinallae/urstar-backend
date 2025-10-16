import mongoose from 'mongoose'

const ReviewSchema = mongoose.Schema(
	{
		content: {
			type: String,
			required: true,
		},
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		rating: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true },
)

export const Review = mongoose.model('Review', ReviewSchema)
