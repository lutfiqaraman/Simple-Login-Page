var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var staticFiles = require("serve-static");

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
  const email = req.body.email;
  const password = req.body.password;

  if (req.body && email && password) {
    if (email == "123@123.123") {
      if (req.body.password == "123123") {
        var user = {
          ...req.body,
          name: "Alex Jones",
          profilePic: "http://lorempixel.com/500/500/people/"
        };

        res.status(200).send(user);
      } else
        res
          .status(400)
          .send({ message: "hey lady, you sent me the wrong password." });
    } else
      res
        .status(400)
        .send({ message: "hey man, you sent me the wrong email." });
  } else res.status(422).send({ message: "yo! you miss`n some stuff!" });
});

var serve = staticFiles("public/", { index: ["index.html"] });
app.use(serve);

app.listen(3000);
console.log("running on http://localhost:3000");
