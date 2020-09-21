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

function makeReviewsArray(){
    return [
        {
            id: 1,
            review: "Great car",
            car_id: 2,
            user_id: 1,
        },
        {
            id: 2,
            review: "Great car too",
            car_id: 2,
            user_id: 1,
        },
        {
            id: 3,
            review: "really great car",
            car_id: 1,
            user_id: 1,
        }
    ]
}
function makeDiecastFixtures() {
    const testCars = makeCarsArray()
    const testUsers = makeUsersArray()
    const testReviews = makeReviewsArray()
    return { testCars, testReviews, testUsers }
}

function cleanTables(db) {
    return db.raw(
        `TRUNCATE 
        cars,
        users,
        reviews
        RESTART IDENTITY CASCADE`
    )
}

function seedDiecastTables(db, cars, users, reviews) {
    return db
        .into('cars')
        .insert(cars)
        .then(() =>
            db
                .into('users')
                .insert(users)
        )
        .then(() =>
            db
                .into('reviews')
                .insert(reviews)
        )
}

function makeExpectedCars(cars, reviews) {
    return cars.map(car => {
        const expectedReview = reviews.filter(review => review.car_id === car.id)
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

function makeExpectedReviews(reviews, cars, users) {
    return reviews.map(review => {
        const expectedCar = cars.filter(car => car.id === review.car_id)
        const expectedUser = users.filter(user => user.id === review.user_id)
        return{
            id: review.id,
            car_id: review.car_id,
            user_id: review.user_id,
            model: expectedCar[0].model,
            review: review.review,
            username: expectedUser[0].username,
        }
    })
}

module.exports = {
    makeCarsArray,
    makeUsersArray,
    makeReviewsArray,
    makeDiecastFixtures,
    cleanTables,
    seedDiecastTables,
    makeExpectedCars,
    makeExpectedUsers,
    makeExpectedReviews,
}
