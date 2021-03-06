require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const carsRouter = require('./cars/cars-router.js')
const usersRouter = require('./users/users-router.js')
const reviewsRouter = require('./reviews/reviews-router.js')
const imagesRouter = require('./images/images-router.js')

const app = express()

const morganOption = (NODE_ENV === 'production')
    ? 'tiny'
    : 'common';
app.use(express.static(__dirname))
app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.use('/api/cars', carsRouter)
app.use('/api/users', usersRouter)
app.use('/api/reviews', reviewsRouter)
app.use('/api/images', imagesRouter)

app.get('/', (req, res) => {
    res.send('Hello, boilerplate!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app