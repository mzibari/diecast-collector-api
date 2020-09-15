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
                'scale',
                'review',
                'username AS reviewer')
            .join('reviews', 'reviews.car_id', '=', 'cars.id')
            .join('users', 'users.id', '=', 'reviews.user_id')
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
            .where('id', id)
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