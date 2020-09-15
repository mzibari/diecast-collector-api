const express = require('express')
const reviewsRouter = express.Router()
const jsonParser = express.json()
const path = require('path')
const ReviewsService = require('./reviews-service')

reviewsRouter
    .route('/')
    .get((req, res, next) => {
        ReviewsService.getAllReviews(
            req.app.get('db')
        )
            .then(reviews => {
                res.json(reviews)
            })
            .catch(next)
    })
    .post(jsonParser, (req, res, next) => {
        const { id, user_id, car_id, review } = req.body
        if (!user_id || !car_id || !review) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain id, user_id, car_id, and review`
                }
            })
        }
        const reviewToAdd = {
            id,
            user_id,
            car_id,
            review,
        }
        ReviewsService.addReview(
            req.app.get('db'),
            reviewToAdd
        )
            .then(review => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl + `/${review.id}`))
                    .json(review)
            })
            .catch(next)
    })

reviewsRouter
    .route('/:review_id')
    .all(checkReviewExists)
    .get((req, res) => {
        res.json(res.review)
    })
    // DELETE /reviews/review_id endpoint, delete review
    .delete((req, res, next) => {
        ReviewsService.deleteReview(
            req.app.get('db'),
            req.params.review_id
        )
            .then(() => {
                res
                    .status(204)
                    .send(('Review has been deleted'))
                    .end()
            })
            .catch(next)
    })


async function checkReviewExists(req, res, next) {
    try {
        const review = await ReviewsService.getReviewById(
            req.app.get('db'),
            req.params.review_id
        )

        if (!review)
            return res.status(404).json({
                error: `Review doesn't exist`
            })

        res.review = review
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = reviewsRouter

