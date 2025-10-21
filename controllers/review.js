import {Review, Product} from '../models/index.js'

//add
export const addReview = async(productId, review) => {
    const newReview = await Review.create(review)
    await Review.findByIdAndUpdate(productId, {$push: {reviews: newReview}})
    await newReview.populate('author')
    return newReview
}

//delete
export const removeReview = async(productId, reviewId) => {
    await Review.deleteOne({_id: reviewId})
    await Product.findByIdAndUpdate(productId, {$pull: {reviews: reviewId}})
}
