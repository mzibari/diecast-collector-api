function makeCarsArray() {
    return [
        {
            id: 1,
            model: 'Skyline',
            make: 'Nissan',
            year: 1992,
            description: 'great japanese car',
            manufacturer: 'HotWheels',
            scale: '1/64',
        },
        {
            id: 2,
            model: 'Supra',
            make: 'Toyota',
            year: 1992,
            description: 'great japanese car',
            manufacturer: 'HotWheels',
            scale: '1/64',
        },
        {
            id: 3,
            model: 'R8',
            make: 'Audi',
            year: 2010,
            description: 'great german car',
            manufacturer: 'HotWheels',
            scale: '1/64',
        },
        {
            id: 4,
            model: 'DeLorean',
            make: 'DMC',
            year: 1981,
            description: 'great american car',
            manufacturer: 'HotWheels',
            scale: '1/64',
        },
    ]
}

function makeDiecastFixtures() {
    const testCars = makeCarsArray()
    return { testCars }
}

function cleanTables(db) {
    return db.raw(
        `TRUNCATE 
        cars
        RESTART IDENTITY CASCADE`
    )
}

function seedDiecastTables(db, cars) {
    return db
        .into('cars')
        .insert(cars)
}

function makeExpectedCars(cars) {
    return cars.map(car => {
        return {
            id: car.id,
            model: car.model,
            make: car.make,
            year: car.year,
            description: car.description,
            manufacturer: car.manufacturer,
            scale: car.scale,
        }
    })
}

module.exports = {
    makeCarsArray,
    makeDiecastFixtures,
    cleanTables,
    seedDiecastTables,
    makeExpectedCars
}
