//dependencies
const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 3000;
const userRoutes = require("./routes/user-routes");

const {sequelize} = require('./models');

//dotenv
dotenv.config();

//App
app.use(cors());
app.use(express.json());

//routes
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.log("Something went wrong!!!");
  return res.status(404).json({ error: "Something went wrong"});
})

app.get("/test", (req, res) => {
  console.log("Test was called!");
  res.send("Node setup worked");
});

app.listen(port, async () => {
  await sequelize.sync();
  console.log("Welcome to Node!! Server is running...");
});