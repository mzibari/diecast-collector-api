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

function makeUsersArray() {
    return [
        {
            id: 1,
            username: 'Mahmood',
            email: 'm.zibari@gmail.com',
            user_password: 'password1',
            is_admin: true
        },
        {
            id: 2,
            username: 'Katie',
            email: 'm.katie@gmail.com',
            user_password: 'password2',
            is_admin: false
        },
        {
            id: 3,
            username: 'Falafel',
            email: 'm.falafel@gmail.com',
            user_password: 'password3',
            is_admin: false
        }
    ]
}

function makeDiecastFixtures() {
    const testCars = makeCarsArray()
    const testUsers = makeUsersArray()
    return { testCars, testUsers }
}

function cleanTables(db) {
    return db.raw(
        `TRUNCATE 
        cars,
        users
        RESTART IDENTITY CASCADE`
    )
}

function seedDiecastTables(db, cars, users) {
    return db
        .into('cars')
        .insert(cars)
        .then(() =>
            db
                .into('users')
                .insert(users)
        )
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

function makeExpectedUsers(users) {
    return users.map(user => {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            user_password: user.user_password,
            is_admin: user.is_admin,
        }
    })
}

module.exports = {
    makeCarsArray,
    makeUsersArray,
    makeDiecastFixtures,
    cleanTables,
    seedDiecastTables,
    makeExpectedCars,
    makeExpectedUsers,
}
