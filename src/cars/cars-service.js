const CarsService = {
    getAllCars(knex) {
        return knex
            .from('cars')
            .select(
                'model',
                'make',
                'year',
                'description',
                'manufacturer',
                'scale')
            .join('reviews', 'reviews.car_id', 'cars.id')
            .count('* as reviews')
            .groupBy('cars.id', 'reviews.car_id')
            .havingIn('reviews.review', '=', 'null')

    },
    //--------------------------------------------
    addCar(knex, newCar) {
        return knex
            .insert(newCar)
            .into('cars')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //--------------------------------------------
    getCarById(knex, id) {
        return CarsService.getAllCars(knex)
            .where('cars.id', id)
            .first()
    },
    //--------------------------------------------
    deleteCar(knex, id) {
        return knex('cars')
            .where({ id })
            .delete()
    },
}

module.exports = CarsService