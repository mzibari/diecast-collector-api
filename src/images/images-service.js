const ImagesService = {
    getAllImages(knex) {
        return knex
            .from('images')
            .select('*')
    },
    //--------------------------------------------
    addImage(knex, newImage) {
        return knex
            .insert(newImage)
            .into('images')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //--------------------------------------------
    getImageById(knex, id) {
        return ImagesService.getAllImages(knex)
            .where('images.id', id)
            .first()
    },
    //--------------------------------------------
    deleteImage(knex, id) {
        return knex('images')
            .where({ id })
            .delete()
    },
}

module.exports = ImagesService