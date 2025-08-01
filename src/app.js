import express from "express";
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credintials: true
}));

app.use(express.json({
  limit: "16kb",
})); //To get the data comming in the (body of url) json form.
app.use(express.urlencoded({extended: true, limit: "16kb"}));
app.use(express.static("public"));
app.use(cookieParser());

//Route imports
import userRouter from "./routes/user.routes.js";

//Route declaration
app.use("/api/v1/users", userRouter);

export { app };
