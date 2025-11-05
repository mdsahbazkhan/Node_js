const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");

//MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/learning_nodejs")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error", err));
//Schema
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    required: true,
  },
  jobTitle: {
    type: String,
  },
});
const User = new mongoose.model("user", userSchema);
//Middleware
app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `${Date.now()}:${req.method}:${req.path}\n`,
    (err, data) => {
      next();
    }
  );
});

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users
      .map(
        (user) =>
          `
        <li>
        ${user.first_name}
        </li>`
      )
      .join("")}
    </ul>
    `;
  res.send(html);
});
//Route
app.get("/api/users", (req, res) => {
  return res.json(users);
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.json(user);
  })
  .patch((req, res) => {
    const body = req.body;
    const id = Number(req.params.id);
    const user = users.find((user) => user.id == id);
    if (!user) {
      return res.json({ status: "error", message: "User not found" });
    }
    Object.assign(user, body);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      if (err) {
        return res.json({ status: "error", message: "Failed to update file" });
      } else {
        return res.json({ status: "succes", message: "User updated", user });
      }
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const updaterUsers = users.filter((user) => user.id != id);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(updaterUsers), (err) => {
      return res.json({ status: "success", message: "User deleted" });
    });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job - title
  ) {
    return res.status(400).json({ msg: "All field are required." });
  }
  // users.push({ ...body, id: users.length + 1 });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "succes", id: users.length });
  // });
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job - title,
  });
  return res.status(201).json({});
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
