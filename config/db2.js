const {Client} = require('pg')

const client2 = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "1859",
    database: "postgres"
})

module.exports = client2
