const express = require('express')
const usersRouter = express.Router()
const jsonParser = express.json()
const path = require('path')
const UsersService = require('./users-service')

usersRouter
    .route('/')
    .get((req, res, next) => {
        UsersService.getAllUsers(
            req.app.get('db')
        )
            .then(users => {
                res.json(users)
            })
            .catch(next)
    })


module.exports = usersRouter