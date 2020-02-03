const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const staticFiles = require("serve-static");

//Crypto is a build in function in nodejs
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

  //Error Handling Array 
  const errMsg = [
    "hey lady, you sent me the wrong password.",
    "hey man, you sent me the wrong email.",
    "yo! you miss`n some stuff!"
  ];

  //Hasing Password
  const salt = crypto.randomBytes(16).toString('hex'); 
  const hashingpassword = crypto.pbkdf2Sync(password, salt,  1000, 64, `sha512`).toString(`hex`); 

  //"123123"
  if (req.body && email && password) {
    if (email == "123@123.123") {
      if (hashingpassword) {
        var user = {
          ...req.body,
          password: hashingpassword,
          name: "Alex Jones",
          profilePic: "http://lorempixel.com/500/500/people/"
        };

        res.status(200).send(user);
      } else
        res
          .status(400)
          .send(errMsg[0])
    } else
      res
        .status(400)
        .send(errMsg[1])
  } else res.status(422).send(errMsg[2]);
});

var serve = staticFiles("public/", { index: ["index.html"] });
app.use(serve);

app.listen(3000);
console.log("running on http://localhost:3000");
