
import { dbconnect } from "./db/dbConnection.js";
import { app } from "./app.js";


// database call
 dbconnect()

app.listen(process.env.PORT || 8000, () => {
  console.log(`⚙️ Server is running at port : ${process.env.PORT}`);
});
