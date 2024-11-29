//example of queries
// ? means heres a place for a variable
const usersQueries = {
    allUsers: "SELECT * FROM users",
    userById: "SELECT * FROM users WHERE id = ?",
    userByEmail: "SELECT * FROM users WHERE email = ?",
    userByUserName: "SELECT * FROM users WHERE userName = ?"
}

export default usersQueries      