const CarsService = {
    getAllCars(knex) {
        return knex.select('*').from('cars')
    },
}

module.exports = CarsService