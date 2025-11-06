const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
const mongoose = require("mongoose");
const { timeStamp } = require("console");

//MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/learning_nodejs")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Error", err));
//Schema
const userSchema = new mongoose.Schema(
  {
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
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);
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

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
    ${allDbUsers
      .map(
        (user) =>
          `
        <li>
        ${user.firstName}-${user.email}
        </li>`
      )
      .join("")}
    </ul>
    `;
  res.send(html);
});
//Route
app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
});
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User Not Found" });
    }
    return res.json(user);
  })
  .patch(async (req, res) => {
    try {
      const body = req.body;
      const user = await User.findByIdAndUpdate(
        req.params.id,
        {
          firstName: body.first_name,
          lastName: body.last_name,
          email: body.email,
          gender: body.gender,
          jobTitle: body.job_title,
        },
        { new: true }
      );
      if (!user) {
        return res.json({ status: "error", message: "User not found" });
      } else {
        return res.json({ status: "success", message: "User updated", user });
      }
    } catch (error) {
      console.error(error);
      return res.json({ status: "error", message: "Something went wrong" });
    }
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "success", message: "User deleted" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All field are required." });
  }

  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });

  return res.status(201).json({ msg: "success" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
