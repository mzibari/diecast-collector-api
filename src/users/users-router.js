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


    .post(jsonParser, (req, res, next) => {
        const { username, email, user_password } = req.body
        if (!username || !email || !user_password) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain username, email, and password`
                }
            })
        }
        const userToAdd = {
            username,
            email,
            user_password,
        }
        UsersService.addUser(
            req.app.get('db'),
            userToAdd
        )
            .then(user => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl + `/${user.id}`))
                    .json(user)
            })
            .catch(next)
    })

usersRouter
    .route('/:user_id')
    .all(checkUserExists)
    .get((req, res) => {
        res.json(res.user)
    })
    // DELETE /users/user_id endpoint, delete user
    .delete((req, res, next) => {
        UsersService.deleteUser(
            req.app.get('db'),
            req.params.user_id
        )
            .then(() => {
                res.status(204).end()
            })
            .catch(next)
    })


async function checkUserExists(req, res, next) {
    try {
        const user = await UsersService.getUserById(
            req.app.get('db'),
            req.params.user_id
        )

        if (!user)
            return res.status(404).json({
                error: `User doesn't exist`
            })

        res.user = user
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = usersRouter