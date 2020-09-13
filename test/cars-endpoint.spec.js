const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe('Cars endpoint', function () {
    let db
    const { testCars } = helpers.makeDiecastFixtures()
    const expectedCars = helpers.makeExpectedCars(testCars)

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
    describe(`GET /api/cars`, () => {
        context(`Given no cars`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/cars')

                    .expect(200, [])
            })
        })

        context('Given there are cars in the database', () => {
            beforeEach('insert cars', () =>
                helpers.seedDiecastTables(
                    db,
                    testCars,
                )
            )

            it('responds with 200 and all of the cars', () => {
                return supertest(app)
                    .get('/api/cars')
                    .expect(200, expectedCars)
            })
        })

    })
    //--------------------------------------------
    describe(`POST /api/cars/`, () => {
        it(`creates a car, responding with 201 and the new car`, function () {
            const newCar = {
                model: 'Test new car',
                make: 'Test new make',
                year: 1990,
                description: 'Test new description',
                manufacturer: 'Test new manufacturer',
                scale: 'Test new scale'
            }
            return supertest(app)
                .post('/api/cars')
                .send(newCar)
                .expect(201)
                .expect(res => {
                    expect(res.body.model).to.eql(newCar.model)
                    expect(res.body.make).to.eql(newCar.make)
                    expect(res.body.year).to.eql(newCar.year)
                    expect(res.body.description).to.eql(newCar.description)
                    expect(res.body.manufacturer).to.eql(newCar.manufacturer)
                    expect(res.body.scale).to.eql(newCar.scale)
                    expect(res.body).to.have.property('id')
                    expect(res.headers.location).to.eql(`/api/cars/${res.body.id}`)
                })
                .then(postRes =>
                    supertest(app)
                        .get(`/api/cars/${postRes.body.id}`)
                        .expect(postRes.body)
                )
        })
    })

    describe(`DELETE /api/cars/:car_id`, () => {
        context('Given there are cars in the database', () => {
            const testCars = helpers.makeCarsArray()
            beforeEach('insert cars', () => {
                return db
                    .into('cars')
                    .insert(testCars)
            })

            it('responds with 204 and removes the car', () => {
                const idToRemove = 2
                const expectedCars = testCars.filter(car => car.id !== idToRemove)
                return supertest(app)
                    .delete(`/api/cars/${idToRemove}`)
                    .expect(204)
                    .then(res =>
                        supertest(app)
                            .get(`/api/cars`)
                            .expect(expectedCars)
                    )
            })
        })

    })
})