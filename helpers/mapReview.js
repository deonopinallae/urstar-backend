export const mapReview = (review) => {
    return {
        content: review.content,
        author: review.author.login || review.author,
        id: review._id,
        publishedAt: review.createdAt
    }
}