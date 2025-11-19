export const mapOutfit = (outfit) => {
	return {
		id: outfit._id.toString(),
		name: outfit.name,
		scene: outfit.scene,
		products: outfit.products,
	}
}
