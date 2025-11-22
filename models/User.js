import mongoose from 'mongoose'
import { ROLES } from '../constants/roles.js'

const UserSchema = mongoose.Schema(
	{
		login: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: Number, default: ROLES.USER },
		cart: [
			{
				product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
				size: String,
			},
		],
		favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
		combinerProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
		outfits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Outfit' }],
	},
	{ timestamps: true },
)

export const User = mongoose.model('User', UserSchema)
