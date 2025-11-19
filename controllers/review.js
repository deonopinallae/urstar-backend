import {Review, Product} from '../models/index.js'

// add review
export const addReview = async (productId, review) => {
  const newReview = await Review.create(review)
  await Product.findByIdAndUpdate(
    productId,
    { $addToSet: { reviews: newReview._id } },
    { new: true }
  )
  return newReview
}

// delete review
export const removeReview = async (productId, reviewId) => {
  await Review.deleteOne({ _id: reviewId })
  await Product.findByIdAndUpdate(
    productId,
    { $pull: { reviews: reviewId } },
    { new: true }
  )
  return reviewId 
}
