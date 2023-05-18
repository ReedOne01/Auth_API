const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
// const jwt = require("jsonWebtoken");

app.use(express.json());

const users = [];

const getProject = (req, res) => {
  res.json(users);
};
const user = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = { name: req.body.name, password: hashedPassword };
    users.push(user);
    res.status(201).json({ msg: `welcome ${user.name}`, user });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
const login = async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (!user || user == null) {
    res.status(400).send("cannot find user");
  }
  try {
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(200).json(`Hi ${req.body.name}, you have successfully login`);
    } else {
      res.send("user not allowed");
    }
  } catch (error) {
    res.status(500).send();
  }
};

app.get("/api/project/", getProject);
app.post("/api/user", user);
app.post("/api/login", login);

app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});
