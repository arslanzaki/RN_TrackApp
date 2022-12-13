require("./models/User");
require("./models/Track")
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const trackRoutes = require("./routes/trackRoutes")
const requireAuth = require("./middlewares/requireAuth");

const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoURI =
  "mongodb+srv://arslanzaki:Malik2060@cluster0.ft5ajln.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(mongoURI);

mongoose.connection.on("connected", () => {
  console.log("Connected To Mongo Instance");
});

mongoose.connection.on("error", (err) => {
  console.log("Error Connecting To Mongo", err);
});

app.get("/", requireAuth, (req, res) => {
  res.send(`Your Email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log("Listening On Port 3000");
});
