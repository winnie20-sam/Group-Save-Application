import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import SavingRoute from "./routes/SavingRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import MpesaRoute from "./routes/MpesaRoute.js";
dotenv.config();

const app = express();
const port = process.env.PORT;

// Save login sessions in the database so users stay logged in after a server restart
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: false,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

// Only one cors setup. credentials: true lets the browser send the login cookie
app.use(cors({
    credentials: true,
    origin: process.env.CLIENT_URL
}));
app.use(express.json());
app.use(UserRoute);
app.use(SavingRoute);
app.use(AuthRoute);
app.use(MpesaRoute);

// Create the tables (users, saving, sessions) if they do not exist yet
const startServer = async () => {
    try {
        await db.authenticate();
        await db.sync();
        await store.sync();
        app.listen(port, ()=> {
            console.log(`Server is running on port ${port}`);
        });
    } catch (error) {
        console.log("Could not connect to the database:", error.message);
    }
}

startServer();
