const ReviewsService = {
    getAllReviews(knex) {
        return knex.select('*').from('reviews')
    },
    //--------------------------------------------
    addReview(knex, newReview) {
        return knex
            .insert(newReview)
            .into('reviews')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //--------------------------------------------
    getReviewById(knex, id) {
        return ReviewsService.getAllReviews(knex)
            .where('id', id)
            .first()
    },
    //--------------------------------------------
    deleteReview(knex, id) {
        return knex('reviews')
            .where({ id })
            .delete()
    },
}

module.exports = ReviewsService