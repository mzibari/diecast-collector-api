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

carsRouter
    .route('/:car_id')
    .all(checkCarExists)
    .get((req, res) => {
        res.json(res.car)
    })
    // DELETE /cars/car_id endpoint, delete car
    .delete((req, res, next) => {
        CarsService.deleteCar(
            req.app.get('db'),
            req.params.car_id
        )
            .then(() => {
                res
                    .status(204)
                    .send(('Car has been deleted'))
                    .end()
            })
            .catch(next)
    })


async function checkCarExists(req, res, next) {
    try {
        const car = await CarsService.getCarById(
            req.app.get('db'),
            req.params.car_id
        )

        if (!car)
            return res.status(404).json({
                error: `Car doesn't exist`
            })

        res.car = car
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = carsRouter

