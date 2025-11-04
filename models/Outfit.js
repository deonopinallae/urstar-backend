import mongoose from 'mongoose'

const OutfitSchema = mongoose.Schema(
	{
		author: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		images: [{
			type: String,
			required: true,
		}],
		name: {
			type: String,
			required: true,
		}
	},
	{ timestamps: true },
)

export const Outfit = mongoose.model('Outfit', OutfitSchema)
