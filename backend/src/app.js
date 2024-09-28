import express from "express"
const app=express()
import dotenv from "dotenv";
import cors from 'cors';

dotenv.config({
  path: ".env",
});

// cors 
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// routes import
import userRouter from './routes/user.route.js';

import emloyerRouter from './routes/employer.route.js'

// route declaration
app.use("/api/v1/users", userRouter)
app.use("/api/v1/employers", emloyerRouter);



export {app}