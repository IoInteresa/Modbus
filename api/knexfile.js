module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "../database.sqlite",
    },
    migrations: {
      directory: "./src/Database/migrations",
    },
    useNullAsDefault: true
  },
};
