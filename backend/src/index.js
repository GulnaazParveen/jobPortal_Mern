import dotenv from "dotenv";
dotenv.config({
  path: ".env",
});
import { dbconnect } from "./db/dbConnection.js";
dbconnect(); 

import { app } from "./app.js"; 


app.listen(process.env.PORT || 8000, () => {
  console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
});
