import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();

// Database settings come from the .env file so no passwords are saved in the code
const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false
});

export default db;
