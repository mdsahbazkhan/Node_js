const express = require("express");
const { connectDb } = require("./connection");
const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");
const app = express();
const PORT = 3000;

//Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

connectDb("mongodb://127.0.0.1:27017/learning_nodejs").then(() =>
  console.log("MongoDB Connected!")
);

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
