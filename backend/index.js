import express from 'express'
const app=express()
const port=process.env.PORT || '8000'
import router from './routes/web.js'
const database_url= process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017'
import { dbconnect } from './db/dbConnection.js'
import bodyParser from 'body-parser';
import cors from 'cors';

// Middleware
app.use(cors());
app.use(bodyParser.json());

// CREATE FUNCTION FOR DATABASE CONNECTION IN ANY FILE THAT FUNCTION CONTAIN CONNECTION DATABASE USING MOONGOOSE.CONNECT THEN EXPORT THE FUNCTION 
// CALLING DATABASE FUNCTION
dbconnect(database_url)


app.use('/api',router)

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
})