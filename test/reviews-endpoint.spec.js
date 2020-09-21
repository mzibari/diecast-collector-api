const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe('Reviews endpoint', function () {
    let db
    const { testCars, testReviews, testUsers } = helpers.makeDiecastFixtures()
    const expectedReviews = helpers.makeExpectedReviews(testReviews, testCars, testUsers)

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DATABASE_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())
    before('cleanup', () => helpers.cleanTables(db))
    afterEach('cleanup', () => helpers.cleanTables(db))
    //--------------------------------------------
    describe(`GET /api/reviews`, () => {
        context(`Given no reviews`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/reviews')

                    .expect(200, [])
            })
        })

        context('Given there are reviews in the database', () => {
            beforeEach('insert reviews', () =>
                helpers.seedDiecastTables(
                    db,
                    testCars,
                    testUsers,
                    testReviews,
                )
            )

            it('responds with 200 and all of the reviews', () => {
                return supertest(app)
                    .get('/api/reviews')
                    .expect(200, expectedReviews)
            })
        })

    })
    //--------------------------------------------
    describe(`POST /api/reviews/`, () => {
        beforeEach('insert reviews', () =>
            helpers.seedDiecastTables(
                db,
                testCars,
                testUsers,
            )
        )
        it(`creates a review, responding with 201 `, function () {
            const newReview = {
                user_id: 3,
                car_id: 4,
                review: 'Great car',
            }
            return supertest(app)
                .post('/api/reviews')
                .send(newReview)
                .expect(201)
                .expect(res => {
                    expect(res.body.car_id).to.eql(newReview.car_id)
                    expect(res.body.user_id).to.eql(newReview.user_id)
                    expect(res.body.review).to.eql(newReview.review)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/reviews/${res.body.id}`)
                })
        })
    })

    describe(`DELETE /api/reviews/:review_id`, () => {
        context('Given there are reviews in the database', () => {
            const { testReviews, testCars, testUsers } = helpers.makeDiecastFixtures()
            const expectedReviews = helpers.makeExpectedReviews(testReviews, testCars, testUsers)
            beforeEach('insert reviews', () =>
                helpers.seedDiecastTables(
                    db,
                    testCars,
                    testUsers,
                    testReviews,
                )
            )

            it('responds with 204 and removes the review', () => {
                const idToRemove = 1
                expectedReviewsAfterDelete = expectedReviews.filter(review => review.id !== idToRemove)
                return supertest(app)
                    .delete(`/api/reviews/${idToRemove}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/reviews`)
                            .expect(expectedReviewsAfterDelete)
                    )
            })
        })

    })
})