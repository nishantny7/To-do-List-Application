//Imports
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

//Create web server
const app = express();
dotenv.config();

//Import routes
const todoRoute = require("./routes/todo");
const authRoute = require("./routes/auth");

//Middleware
app.use(express.json());
app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization"
  );
  res.header("Access-Control-Expose-Headers", "auth-token");

  next();
});
app.use(cors());

//Route middleware
app.use("/", todoRoute);
app.use("/auth", authRoute);

//Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("Connected to DB")
);

app.listen(8888, () => console.log("Server is up and running"));
