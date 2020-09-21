const CarsService = {
    getAllCars(knex) {
        return knex
            .from('cars')
            .select(
                'id',
                'model',
                'make',
                'year',
                'description',
                'manufacturer',
                'scale')
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