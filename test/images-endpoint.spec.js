const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe('Images endpoint', function () {
    let db
    const { testCars, testReviews, testUsers, testImages } = helpers.makeDiecastFixtures()
    const expectedImages = helpers.makeExpectedImages(testImages)

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
    describe(`GET /api/images`, () => {
        context(`Given no images`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/images')

                    .expect(200, [])
            })
        })

        context('Given there are images in the database', () => {
            beforeEach('insert images', () =>
                helpers.seedDiecastTables(
                    db,
                    testCars,
                    testUsers,
                    testReviews,
                    testImages,
                )
            )

            it('responds with 200 and all of the images', () => {
                return supertest(app)
                    .get('/api/images')
                    .expect(200, expectedImages)
            })
        })

    })
    //--------------------------------------------
    /* describe(`POST /api/images/`, () => {
        it(`creates a image, responding with 201 and the new image`, function () {
            const newImage = {
                car_id: 2,
                img_name: 'car image',
                img: '/path',
            }
            return supertest(app)
                .post('/api/images')
                .send(newImage)
                .expect(201)
                .expect(res => {
                    expect(res.body.model).to.eql(newImage.model)
                    expect(res.body.make).to.eql(newImage.make)
                    expect(res.body.year).to.eql(newImage.year)
                    expect(res.body.description).to.eql(newImage.description)
                    expect(res.body.manufacturer).to.eql(newImage.manufacturer)
                    expect(res.body.scale).to.eql(newImage.scale)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/images/${res.body.id}`)
                })
                .then(postRes =>
                    supertest(app)
                        .get(`/api/images/${postRes.body.id}`)
                        .expect(postRes.body)
                )
        })
    }) */

    describe(`DELETE /api/images/:image_id`, () => {
        context('Given there are images in the database', () => {
            const { testCars, testReviews, testUsers, testImages } = helpers.makeDiecastFixtures()
            beforeEach('insert images', () =>
                helpers.seedDiecastTables(
                    db,
                    testCars,
                    testUsers,
                    testReviews,
                    testImages,
                )
            )

            it('responds with 204 and removes the image', () => {
                const idToRemove = 2
                const expectedImages = testImages.filter(image => image.id !== idToRemove)
                return supertest(app)
                    .delete(`/api/images/${idToRemove}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/images`)
                            .expect(expectedImages)
                    )
            })
        })

    })
})