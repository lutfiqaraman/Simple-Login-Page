const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const staticFiles = require("serve-static");

console.log(__dirname);
require("dotenv").config({ path: "./config/.env" });

const port = process.env.PORT;

//Crypto is a built-in function in nodejs
const crypto = require("crypto");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// log all api traffic to console
app.use("api/*", req => {
  console.log(req);
  next();
});

app.post("/api/login", (req, res) => {
  //Define email and password variable
  const email = req.body.email;
  const password = req.body.password;
  const databasepassword = process.env.DB_PASSWORD;

  //Hasing and Salting Password
  const salt = crypto.randomBytes(16).toString("hex");

  const hashinguserpassword = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");
  
    const hashingdatabasepassword = crypto
    .pbkdf2Sync(databasepassword, salt, 1000, 64, "sha512")
    .toString("hex");

  //Error Handling Array
  const errMsg = [
    "hey lady, you sent me the wrong password.",
    "hey man, you sent me the wrong email.",
    "yo! you miss`n some stuff!"
  ];

  if (req.body && email && password) {
    if (email == "123@123.123") {
      if (hashinguserpassword == hashingdatabasepassword) {
        var user = {
          ...req.body,
          password: hashinguserpassword,
          name: "Alex Jones",
          profilePic: "http://lorempixel.com/500/500/people/"
        };

        res.status(200).send(user);
      } else res.status(400).send(errMsg[0]);
    } else res.status(400).send(errMsg[1]);
  } else res.status(422).send(errMsg[2]);
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(port);
console.log("running on http://localhost:" + port);
