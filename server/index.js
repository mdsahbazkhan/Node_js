const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("My Home Page");
});
app.get("/about", (req, res) => {
  const userName = "Sahbaz";
  res.send(`Hello, ${userName}`);
});

const port = 8001;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
