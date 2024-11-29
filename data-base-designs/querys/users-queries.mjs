const usersQueries = {
    getAllUsers: 'SELECT * FROM users',
    getUserById: 'SELECT * FROM users WHERE id = ?',
    getUserByUserName: 'SELECT * FROM users WHERE username = ?',
    getUserByPhoneNumber: 'SELECT * FROM users WHERE phone_number = ?',
    getUserByEmail: 'SELECT * FROM users WHERE email = ?',
}
export default usersQueries