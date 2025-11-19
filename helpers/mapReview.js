export const mapReview = (review) => {
    return {
        id: review._id.toString(),
        content: review.content,
        author: review.author,
        publishedAt: review.publishedAt,
        rating: review.rating
    }
}