const express = require('express')
const carsRouter = express.Router()
const jsonParser = express.json()
const path = require('path')
const CarsService = require('./cars-service')

carsRouter
    .route('/')
    .get((req, res, next) => {
        CarsService.getAllCars(
            req.app.get('db')
        )
            .then(cars => {
                res.json(cars)
            })
            .catch(next)
    })


module.exports = carsRouter