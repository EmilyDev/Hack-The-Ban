const { DB_PASSWORD, DATABASE_URL } = process.env

module.exports = {
  development: {
    username: 'postgres',
    password: DB_PASSWORD,
    database: 'BorderBuddy',
    dialect: 'postgres',
  },
  test: {
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'BorderBuddy_test',
    dialect: 'postgres',
  },
  production: {
    url: DATABASE_URL,
  },
}
