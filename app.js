import express from "express";
import mongoose from "mongoose";
// import useRouter from "./routes/user-routes";
import userRouter from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
const app = express();
app.use(express.json());
app.use("/api/user", userRouter);
app.use("/api/blog", blogRouter);
mongoose
  .connect(
    "mongodb+srv://caviral76:rVMnrOJvk8kPX5yF@blog.wqkdbf8.mongodb.net/Blog?retryWrites=true&w=majority"
  )
  .then(() => app.listen(5000))
  .then(() => console.log("connected to database and listening on port 50000"))
  .catch((err) => console.log(err));
// app.use("/api", (req, res, next) => {
//   res.send("Hello World");
// });

// app.listen(5000);
