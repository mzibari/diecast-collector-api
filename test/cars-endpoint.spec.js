const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe('Cars endpoint', function () {
    let db
    const {testCars} = helpers.makeDiecastFixtures()
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
})