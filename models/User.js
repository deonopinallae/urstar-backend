import mongoose from 'mongoose'
import { ROLES } from '../constants/roles.js'

const UserSchema = mongoose.Schema(
	{
		login: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		role: { type: Number, default: ROLES.USER },
		cart: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
		favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
		combinerProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
		outfits: [
			{
				author: {
					type: String,
					required: true,
				},
				scene: {
					top: {
						type: String,
					},
					accessory: {
						type: String,
					},
					bottom: {
						type: String,
					},
					shoes: {
						type: String,
					},
				},
				name: {
					type: String,
					required: true,
				},
			},
		],
	},
	{ timestamps: true },
)

export const User = mongoose.model('User', UserSchema)
