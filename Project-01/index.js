const express = require("express");
const fs = require("fs");
const app = express();
const PORT = 3000;
const users = require("./MOCK_DATA.json");

//Middleware
app.use(express.urlencoded({ extended: false }));

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

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "succes", id: users.length });
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
