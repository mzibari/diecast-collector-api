const CarsService = {
    getAllCars(knex) {
        return knex.select('*').from('cars')
    },
    addCar(knex, newCar) {
        return knex
            .insert(newCar)
            .into('cars')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
}

module.exports = CarsService