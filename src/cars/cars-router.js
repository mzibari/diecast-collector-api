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
    .post(jsonParser, (req, res, next) => {
        const { model, make, year, description, manufacturer, scale } = req.body
        if (!manufacturer) manufacturer = ''
        if (!scale) scale = ''
        if (!model || !make || !year || !description) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain model, make, year and description`
                }
            })
        }
        const carToAdd = {
            model,
            make,
            year,
            description,
            manufacturer,
            scale,
        }
        CarsService.addCar(
            req.app.get('db'),
            carToAdd
        )
            .then(car => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl + `/${car.id}`))
                    .json(car)
            })
            .catch(next)
    })


module.exports = carsRouter

