import express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogrouter from "./routes/blog-routes.js";

const app = express();
// MiddleWare
app.use(express.json());
app.use("/api/user", router);
app.use("/api/blog", blogrouter);

mongoose
  .connect(
    "mongodb+srv://admin:1cQYPiZ0ootdq94K@blog.ep6wp.mongodb.net/?retryWrites=true&w=majority&appName=Blog",
  )
  .then(() => app.listen(3000))
  .then(() => console.log("Connected to MongoDB and listening on port 3000"))
  .catch((error) => console.log(error));

app.use("/", (req, res, next) => {
  res.send("Hello Backend Devs");
});
