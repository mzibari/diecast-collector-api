const knex = require('knex')
const app = require('../src/app')
const helpers = require('./test-helpers')
const supertest = require('supertest')

describe('Users endpoint', function () {
    let db
    const {testCars, testUsers} = helpers.makeDiecastFixtures()
    const expectedUsers = helpers.makeExpectedUsers(testUsers)

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

    describe(`GET /api/users`, () => {
        context(`Given no users`, () => {
            it(`responds with 200 and an empty list`, () => {
                return supertest(app)
                    .get('/api/users')
                    
                    .expect(200, [])
            })
        })

        context('Given there are users in the database', () => {
            beforeEach('insert users', () =>
                helpers.seedDiecastTables(
                    db,
                    testCars,
                    testUsers,
                )
            )

            it('responds with 200 and all of the users', () => {
                return supertest(app)
                    .get('/api/users')
                    .expect(200, expectedUsers)
            })
        })

    })

    describe(`POST /api/users/`, () => {
        it(`creates a user, responding with 201 and the new user`, function () {
            const newUser = {
                username: 'Test new username',
                email: 'example@email.com',
                user_password: 'Test new user password'
            }
            return supertest(app)
                .post('/api/users')
                .send(newUser)
                .expect(201)
                .expect(res => {
                    expect(res.body.username).to.eql(newUser.username)
                    expect(res.body.email).to.eql(newUser.email)
                    expect(res.body.user_password).to.eql(newUser.user_password)
                    expect(res.body).to.have.property('id')
                    expect(res.body).to.have.property('is_admin')
                    expect(res.headers.location).to.eql(`/api/users/${res.body.id}`)
                })
                .then(postRes =>
                    supertest(app)
                        .get(`/api/users/${postRes.body.id}`)
                        .expect(postRes.body)
                )
        })

    })
})