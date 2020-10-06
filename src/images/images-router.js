const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`)
    },
})

const upload = multer({
    storage: storage, limits: {
        fileSize: 1204 * 1204 * 5
    }
})

const express = require('express')
const imagesRouter = express.Router()
const jsonParser = express.json()
const path = require('path')
const ImagesService = require('./images-service')

imagesRouter
    .route('/')
    .get((req, res, next) => {
        ImagesService.getAllImages(
            req.app.get('db')
        )
            .then(images => {
                res.json(images)
            })
            .catch(next)
    })
    .post(upload.single('carImage'), (req, res, next) => {
        const { car_id, img_name } = req.body
        const img = req.file.originalname
        if (!car_id || !img_name) {
            return res.status(400).json({
                error: {
                    message: `Request body must contain car_id and image name`
                }
            })
        }
        const imageToAdd = {
            car_id,
            img_name,
            img,
        }
        ImagesService.addImage(
            req.app.get('db'),
            imageToAdd
        )
            .then(img => {
                res.status(201)
                    .location(path.posix.join(req.originalUrl + `/${img.id}`))
                    .json(img)
            })
            .catch(next)
    })

imagesRouter
    .route('/:image_id')
    .all(checkImageExists)
    .get((req, res) => {
        res.sendFile(path.join(__dirname,`../../${res.image.img}`))
    })
    // DELETE /images/image_id endpoint, delete image
    .delete((req, res, next) => {
        ImagesService.deleteImage(
            req.app.get('db'),
            req.params.image_id
        )
            .then(() => {
                res
                    .status(204)
                    .send(('Image has been deleted'))
                    .end()
            })
            .catch(next)
    })


async function checkImageExists(req, res, next) {
    try {
        const image = await ImagesService.getImageById(
            req.app.get('db'),
            req.params.image_id
        )

        if (!image)
            return res.status(404).json({
                error: `Image doesn't exist`
            })

        res.image = image
        next()
    } catch (error) {
        next(error)
    }
}


module.exports = imagesRouter
