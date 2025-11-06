export const mapReview = (review) => {
    return {
        id: review.id,
        content: review.content,
        author: review.author,
        publishedAt: review.publishedAt,
        rating: review.rating
    }
}