const UsersService = {
    getAllUsers(knex) {
        return knex.select('*').from('users')
    },
    //--------------------------------------------
    addUser(knex, newUser) {
        return knex
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },
    //--------------------------------------------
    getUserById(knex, id) {
        return UsersService.getAllUsers(knex)
            .where('id', id)
            .first()
    },
}

module.exports = UsersService