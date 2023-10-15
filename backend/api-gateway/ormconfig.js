require("dotenv").config();

module.exports = [
  {
    type: "mysql",
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    username: process.env.MYSQL_ACCOUNT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    synchronize: process.env.MYSQL_SYNCHRONIZE,
    logging: process.env.MYSQL_LOGGING,
    entities: [process.env.MYSQL_ENTITIES],
    cli: {
      entitiesDir: process.env.MYSQL_ENTITIES_DIR,
    },
  },
];
