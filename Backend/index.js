import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js";
import SavingRoute from "./routes/SavingRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import TokenRoute from "./routes/token.js";
dotenv.config();

const app = express();
//const TokenRoute = require("./routes/token");
const port = process.env.PORT;



const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

//(async()=>{
 //await db.sync();
//})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    //store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(cors()); 
app.use(UserRoute);
app.use(SavingRoute);
app.use(AuthRoute);
app.use("/token",TokenRoute);

// store.sync();

app.listen(port, ()=> {
    console.log(`Server is running on port  ${port}`);
});
