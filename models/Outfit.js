import mongoose from "mongoose"

const OutfitSchema = new mongoose.Schema({
  name: String,
  scene: {
    top: String,
    bottom: String,
    shoes: String,
    accessory: String
  },
  products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
})

export const Outfit = mongoose.model('Outfit', OutfitSchema)
