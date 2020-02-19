const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    
  } catch (error) {
    res.status(401).send({ error: "Not authenticate" });
  }
};

module.exports = auth;