const express = require("express");
const connectDB = require("./connection");
const urlRoute = require("./routes/url");
const app = express();
const PORT = 3001;
app.use(express.json());
app.use("/url", urlRoute);
connectDB("mongodb://127.0.0.1:27017/short-url")
  .then(() => console.log("MongoDB Connected Successfully!"))
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
  });
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
