let express = require("express");
let server = express();
let upload = require("express-fileupload");
let importExcel = require("convert-excel-to-json");
let del = require("del");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv/config");

server.use(bodyParser.json());
server.use(upload());

//Import Routes
const postsImportExcel = require("./routes/posts");

server.use("/posts", postsImportExcel);

//Routes
server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

try {
  //Connect To Db
  mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () =>
    console.log("Connected to DB!")
  );
} catch (err) {
  console.log(err);
}

server.listen(3000, () => {
  console.log("server runs on port 3000");
});
