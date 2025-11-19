export const mapReview = (review) => {
    return {
        id: review._id,
        content: review.content,
        author: review.author,
        publishedAt: review.publishedAt,
        rating: review.rating
    }
}