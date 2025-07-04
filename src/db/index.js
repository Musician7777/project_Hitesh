import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";

export const mongoDBConnection = async () => {
    try {
        const connectionInstance = await mongoose.connect(
            `${process.env.MONGODB_URI}/${DATABASE_NAME}`
        );
        console.log(
            `\n Connected successfully !! ${connectionInstance.connection.host}`
        );
    } catch (error) {
        console.log("Database connection FAILED -> ", error);
        process.exit(1);
    }
};

export default mongoDBConnection;
