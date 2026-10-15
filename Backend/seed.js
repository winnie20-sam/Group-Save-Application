// Creates the first admin account.
// Only an admin can add users, so without this nobody could ever log in.
// Run once with: npm run seed
import argon2 from "argon2";
import dotenv from "dotenv";
import db from "./config/Database.js";
import Users from "./models/UserModel.js";
import "./models/SavingModel.js";
dotenv.config();

const seedAdmin = async () => {
    await db.sync();

    const exists = await Users.findOne({
        where: {
            email: process.env.ADMIN_EMAIL
        }
    });
    if(exists){
        console.log("Admin already exists");
        process.exit();
    }

    await Users.create({
        name: "Admin",
        email: process.env.ADMIN_EMAIL,
        password: await argon2.hash(process.env.ADMIN_PASSWORD),
        phoneNumber: "0700000000",
        idNumber: "10000000",
        role: "admin"
    });
    console.log("Admin created: " + process.env.ADMIN_EMAIL);
    process.exit();
}

seedAdmin();
