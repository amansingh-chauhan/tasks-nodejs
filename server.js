import { app } from "./app.js";
import { connectDB } from "./utility/database.js";
connectDB();

app.listen(process.env.PORT, () => {
  console.log("server is working");
});
