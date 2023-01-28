const express = require("express");
const dotenv = require("dotenv");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path"); //inbuilt in node application
const connectDB = require("./server/database/connection");
const error = require("./server/middleware/error");

dotenv.config({ path: path.resolve(__dirname, "./.env") });
const PORT = process.env.PORT || 8080;

//log requests
//morgan allows us to log a request on the console whenever we make a request
app.use(morgan("tiny"));

//mongodb connection
connectDB();

//parse request to body
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//set view engine
app.set("view engine", "ejs"); //embedded javascript templating
// app.set("views", path.resolve(__dirname, "views"))

//load assets
//css
app.use("/css", express.static(path.resolve(__dirname, "assets/css")));
//css/styles.css
//css
app.use("/img", express.static(path.resolve(__dirname, "assets/img")));
//img/styles.img
//js
app.use("/js", express.static(path.resolve(__dirname, "assets/js")));
//js/styles.js

//load routers
app.use("/", require("./server/routes/router"));

app.use(error);
//app.use()
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost${PORT}`);
});
